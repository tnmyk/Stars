import { addParticle, draw } from "./particles.js";

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

let exploding = false;

// Initial circle
addParticle();

requestAnimationFrame(animate);
function animate() {
  // request another loop of animation
  draw(ctx, canvas, mousePos, exploding);
  requestAnimationFrame(animate);
}

const getMousePos = (e) => {
  const rect = canvas.getBoundingClientRect();
  mousePos.x = e.clientX - rect.left;
  mousePos.y = e.clientY - rect.top;
};

["mousemove", "pointermove"].forEach((event) => {
  canvas.addEventListener(event, getMousePos);
});

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case " ":
      exploding = true;
      break;
  }
});

document.addEventListener("keyup", () => {
  exploding = false;
});

let addParticleInterval;
["mousedown", "pointerdown"].forEach((event) => {
  canvas.addEventListener(event, () => {
    if (!addParticleInterval) {
      addParticleInterval = setInterval(addParticle, 50);
    }
  });
});

["mouseup", "pointerup"].forEach((event) => {
  canvas.addEventListener(event, () => {
    if (addParticleInterval) {
      clearInterval(addParticleInterval);
      addParticleInterval = null;
    }
  });
});
