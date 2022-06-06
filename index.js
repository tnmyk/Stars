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
  if (shapes.length > 160) shapes.splice(0, 1);
  shapes.push({
    x: window.innerWidth * Math.random(),
    y: window.innerHeight * Math.random(),
    // radius: 3 * Math.random() + 1,
    radius: 2,
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    vx: 0,
    vy: 0,
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

    // a = (g * M) / r^2;
    let ax = shape.radius * 10 * Math.min(1 / Math.pow(distance, 1), 1);
    let ay = shape.radius * 10 * Math.min(1 / Math.pow(distance, 1), 1);

    // if(ax>10) console.log(ax)
    // ax = Math.min(Math.max(ax, -1), 1);
    // ay = Math.min(Math.max(ay, -1), 1);
    ax = Math.min(ax, 0.06);
    ay = Math.min(ay, 0.06);
    ax *= cos;
    ay *= sin;
    console.log({ ax, ay });
    // let vx = (distance / (shape.radius * 10)) * cos;
    // let vy = (distance / (shape.radius * 10)) * sin;

    // let vx = (distance / (shape.radius * 10)) * cos;
    // let vy = (distance / (shape.radius * 10)) * sin;
    // if (Math.abs(shape.vx) < 1) console.log({ x: shape.vx, y: shape.vy });

    // if(distance <  )
    // if (vx > 10 || vy > 10) console.log({ vx, vy });
    if (exploding) {
      ax *= -1;
      ay *= -1;
    }

    // shape.vx += ax;
    // shape.vy += ay;

    shape.vx = Math.min(2.1, Math.max(-2.1, shape.vx + ax));
    shape.vy = Math.min(2.1, Math.max(-2.1, shape.vy + ay));

    shape.x += shape.vx;
    shape.y += shape.vy;
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
