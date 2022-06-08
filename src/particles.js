const shapes = [];
const maxNumberOfParticles = 200;

const genNewParticle = () => {
  return {
    x: window.innerWidth * Math.random(),
    y: window.innerHeight * Math.random(),
    radius: 1.7,
    color: `hsla(${~~(360 * Math.random())},70%,80%,1)`,
    vx: 0,
    vy: 0,
  };
};

export const addParticle = () => {
  if (shapes.length > maxNumberOfParticles) shapes.splice(0, 1);
  const newParticle = genNewParticle();
  shapes.push(newParticle);
};

export const circle = (ctx, canvas, mousePos, exploding) => {
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

    ax = Math.min(ax, 0.06);
    ay = Math.min(ay, 0.06);
    ax *= cos;
    ay *= sin;

    if (exploding) {
      ax *= -1;
      ay *= -1;
    }

    shape.vx = Math.min(2.1, Math.max(-2.1, shape.vx + ax));
    shape.vy = Math.min(2.1, Math.max(-2.1, shape.vy + ay));

    shape.x += shape.vx;
    shape.y += shape.vy;
  });
};
