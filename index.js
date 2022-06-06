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
    let deltaX = (mousePos.x - shape.x) / (shape.radius * 10);
    let deltaY = (mousePos.y - shape.y) / (shape.radius * 10);
    if (exploding) {
      deltaX *= -1;
      deltaY *= -1;
    }
    shape.x += deltaX;
    shape.y += deltaY;
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
