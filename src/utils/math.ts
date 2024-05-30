type Point = {
  x: number;
  y: number;
};

export const getRandomPoint = (
  min: Point = { x: 0, y: 0 },
  max: Point = { x: window.innerWidth, y: window.innerHeight },
): Point => ({
  x: getRandomInRange(min.x, max.x),
  y: getRandomInRange(min.y, max.y),
});

export const randomDistribution = (quantity: number) => {
  return Array.from({ length: quantity }).map(() =>
    getRandomPoint(undefined, { x: window.innerWidth, y: 300 }),
  );
};

export const getRandomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const randomSign = () => {
  return Math.round(Math.random()) * 2 - 1;
};

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const getRandomPositionFromPoint = (
  origin: Point,
  movementRadius: number,
) => {
  return {
    x: origin.x + randomSign() * getRandomInRange(0, movementRadius),
    y: origin.y + randomSign() * getRandomInRange(0, movementRadius),
  };
};
