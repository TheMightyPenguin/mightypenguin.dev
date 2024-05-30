import p5 from 'p5';
import { v4 as uuidv4 } from 'uuid';
import colorPalettes from 'nice-color-palettes';
import { BaseSketchOptions } from '../BaseSketchOptions';

export type Point = {
  x: number;
  y: number;
};

class Circle {
  id: string;
  currentPosition: Point;
  size: number;
  shouldGrow: boolean;
  color: string;

  constructor() {
    this.size = 1;
    this.id = uuidv4();
    this.currentPosition = getRandomPoint();
    this.shouldGrow = true;
    this.color = 'black';
  }

  grow() {
    if (this.shouldGrow && Math.random() > 0.5) {
      this.size += 1;
    }
  }

  stopGrowing() {
    this.shouldGrow = false;
  }
}

type Flower = {
  x: number;
  y: number;
  layers: number;
  colors: string[];
};

export type State = {
  flowers: any[];
};

const SCREEN_BOUNDS = 0;

const config = {
  mobile: {
    particleCount: 100,
  },
  desktop: {
    particleCount: 100,
  },
};

const getConfig = (width: number) => {
  if (width > 1024) {
    return config.desktop;
  }
  return config.mobile;
};

type SketchDeviceConfiguration = {
  particleCount: number;
};

export type SketchOptions = BaseSketchOptions & {
  hideLines?: boolean;
  stopParticles?: boolean;
  colors: {
    background: string;
    others: string[];
  };
};

export const sketch = (sketchOptions: SketchOptions) => (p: p5) => {
  let state: State;
  const padding = 5;

  p.setup = () => {
    const width =
      sketchOptions.width === 'full'
        ? document.body.clientWidth
        : sketchOptions.width;
    const height =
      sketchOptions.height === 'full'
        ? document.body.clientHeight
        : sketchOptions.height;

    p.createCanvas(width, height);
    const config = getConfig(p.width);
    state = getInitialState({ ...config, ...sketchOptions });

    // p.background(sketchOptions.colors.background);

    p.push();
    p.strokeWeight(20);
    p.point(400, 400);
    p.pop();

    // const center = { x: p.width / 2, y: p.height / 2 };
    // let palette = getPalette();
    // drawFlower(center.x, center.y, 5, palette.others);

    const count = 150;
    for (let i = 0; i < count; i++) {
      const x = Math.round(p.random(100, p.width - 100));
      const y = Math.round(p.random(100, p.height - 100));
      let palette = getPalette();
      drawFlower(x, y, 5, palette.others, p.random(1, 6));
    }
  };

  function getPalette() {
    const palette = p.random(colorPalettes);
    return {
      background: palette[0],
      others: palette.slice(1),
    };
  }

  function drawFlower(
    x: number,
    y: number,
    layers: number,
    colors: string[],
    size = 3,
  ) {
    p.push();

    const petalCount = 12;
    const modifiers = [
      // mods
      [-100 * size, 215 * size, 200 * size, 215 * size],
      // [20, 20, 20, 20],
    ];

    p.translate(x, y);

    p.strokeWeight(40);
    p.point(0, 0);

    for (let i = 0; i < petalCount; i++) {
      const [a, b, c, d] = modifiers[0];
      p.stroke('black');
      p.strokeWeight(3);
      p.fill(p.random(colors));
      p.curve(a, b, 0, 0, 0, 0, c, d);
      // p.point(a, b);
      // p.point(c, d);
      // p.point(0, 0);
      p.rotate(100);
    }

    // p.stroke(p.random(colors));
    // p.strokeWeight(20);
    // p.point(0, 0);
    // p.strokeWeight(1);
    p.pop();
  }

  p.windowResized = () => {
    const width =
      sketchOptions.width === 'full'
        ? document.body.clientWidth
        : sketchOptions.width;
    const height =
      sketchOptions.height === 'full' ? p.windowHeight : sketchOptions.height;

    p.resizeCanvas(width, height);
    const config = getConfig(p.width);
    state = getInitialState({ ...config, ...sketchOptions });

    p.background(sketchOptions.colors.background);
    p.setup();
  };

  p.draw = () => {};
};

export const renderSketch = (
  container: HTMLDivElement,
  options: SketchOptions,
) => {
  return new p5(sketch(options), container);
};

const getRandomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const getRandomPoint = (): Point => ({
  x: getRandomInRange(SCREEN_BOUNDS, window.innerWidth - SCREEN_BOUNDS),
  y: getRandomInRange(SCREEN_BOUNDS, window.innerHeight - SCREEN_BOUNDS),
});

const getCircleDistance = (a: Circle, b: Circle) => {
  return (
    Math.sqrt(
      Math.pow(b.currentPosition.x - a.currentPosition.x, 2) +
        Math.pow(b.currentPosition.y - a.currentPosition.y, 2),
    ) -
    (b.size / 2 + a.size / 2)
  );
};

const getClosestCircle = (circle: Circle, allCircles: Array<Circle>) => {
  return allCircles
    .filter((otherCircle) => otherCircle !== circle)
    .sort((a, b) => {
      const aToPoint = getCircleDistance(a, circle);
      const bToPoint = getCircleDistance(b, circle);
      return aToPoint - bToPoint;
    })
    .slice(0, 1)[0];
};

export const getInitialState = ({
  particleCount = 150,
}: Partial<SketchDeviceConfiguration & SketchOptions> = {}): State => {
  return {
    // @ts-ignore
    flowers: [],
  };
};
