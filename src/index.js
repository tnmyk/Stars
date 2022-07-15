import { addParticle, draw } from "./particles.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.font = "14px serif";
ctx.fillStyle = "#000";

let mousePos = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
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
["mousedown", "touchstart"].forEach((event) => {
  canvas.addEventListener(event, (e) => {
    if (event === "touchstart" && e.touches.length > 1) {
      return (exploding = true);
    }
    if (!addParticleInterval) {
      addParticleInterval = setInterval(addParticle, 50);
    }
  });
});

["mouseup", "touchend"].forEach((event) => {
  canvas.addEventListener(event, (e) => {
    if (event === "touchend" && e.touches.length > 0) {
      return (exploding = false);
    }
    if (addParticleInterval) {
      clearInterval(addParticleInterval);
      addParticleInterval = null;
    }
  });
});
