const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.font = "14px serif";
ctx.fillStyle = "#000";
ctx.fillText(`x:0 y:0`, 15, 20);

let mousePos = {
  x: window.innerWidth,
  y: window.innerHeight,
};
const getMousePos = (e) => {
  const rect = canvas.getBoundingClientRect();
  mousePos.x = e.clientX - rect.left;
  mousePos.y = e.clientY - rect.top;
  return mousePos;
};

// const writeLocation = (e) => {
//   const pos = getMousePos(canvas, e);
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.fillText(`x:${pos.x} y:${pos.y}`, 15, 20);
// };

const addCircle = () => {
  if (shapes.length > 100) shapes.splice(0, 1);
  shapes.push({
    x: window.innerWidth * Math.random(),
    y: window.innerHeight * Math.random(),
    radius: 3 * Math.random() + 1,
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    vx: 10,
    vy: 10,
    // color: "white",
  });
};
const shapes = [];
addCircle();

const circle = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.map((shape) => {
    ctx.beginPath();
    ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
    ctx.fillStyle = shape.color;
    ctx.fill();

    const deltaX = mousePos.x - shape.x;
    const deltaY = mousePos.y - shape.y;
    const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    const sin = deltaY / distance;
    const cos = deltaX / distance;
    let vx = (distance / (shape.radius * 10)) * cos;
    let vy = (distance / (shape.radius * 10)) * sin;
    
    if (Math.abs(shape.vx) < 1) console.log({ x: shape.vx, y: shape.vy });
    if (Math.abs(vx) < 1) {
      vx = shape.vx;
    }
    if (Math.abs(vy) < 1) {
      vy = shape.vy;
    }

    shape.vx = vx;
    shape.vy = vy;
    vx = 10 / vx;
    vy = 10 / vy;
    // if (vx > 10 || vy > 10) console.log({ vx, vy });
    if (exploding) {
      vx *= -1;
      vy *= -1;
    }

    shape.x += vx;
    shape.y += vy;
    return shape;
  });
};

requestAnimationFrame(animate);
function animate(currentTime) {
  // request another loop of animation
  circle();
  requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", getMousePos);

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case " ":
      addCircle();
      break;
    case "e":
      setExplode();
      break;
  }
});

let exploding = false;
document.addEventListener("keyup", () => {
  exploding = false;
});
const setExplode = () => {
  exploding = true;
};
