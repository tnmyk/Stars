const particles = [];
const options = {
  maxNumberOfParticles: 200,
  maxAbsAcceleration: 0.09,
  maxSpeed: 2.5,
};

const genNewParticle = () => {
  return {
    x: window.innerWidth * Math.random(),
    y: window.innerHeight * Math.random(),
    radius: 1.7,
    // Used to generate bright colors
    color: `hsla(${~~(360 * Math.random())},70%,80%,1)`,
    vx: 0,
    vy: 0,
  };
};

export const addParticle = () => {
  if (particles.length > options.maxNumberOfParticles) particles.splice(0, 1);
  const newParticle = genNewParticle();
  particles.push(newParticle);
};

export const draw = (ctx, canvas, mousePos, exploding) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((shape) => {
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

    ax = Math.min(ax, options.maxAbsAcceleration);
    ay = Math.min(ay, options.maxAbsAcceleration);

    ax *= cos;
    ay *= sin;

    // If exploding reverse the direction of acc
    if (exploding) {
      ax *= -1;
      ay *= -1;
    }

    shape.vx = Math.min(
      options.maxSpeed,
      Math.max(-options.maxSpeed, shape.vx + ax)
    );

    shape.vy = Math.min(
      options.maxSpeed,
      Math.max(-options.maxSpeed, shape.vy + ay)
    );

    shape.x += shape.vx;
    shape.y += shape.vy;
  });
};
