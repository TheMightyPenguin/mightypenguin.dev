import p5 from 'p5';
import { v4 as uuidv4 } from 'uuid';

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

export type State = {
  circles: Array<Circle>;
};

const SCREEN_BOUNDS = 0;

const config = {
  mobile: {
    particleCount: 350,
  },
  desktop: {
    particleCount: 450,
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

export type SketchOptions = {
  getInitialPositions?: any;
  hideLines?: boolean;
  stopParticles?: boolean;
  width: 'full' | number;
  height: 'full' | number;
  colors: {
    background: string;
    others: string[];
  };
};

const sketch = (sketchOptions: SketchOptions) => (p: p5) => {
  let state: State;

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
    state.circles = state.circles.map((circle) => {
      circle.color = p.random(sketchOptions.colors.others);
      return circle;
    });
  };

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
    state.circles = state.circles.map((circle) => {
      circle.color = p.random(sketchOptions.colors.others);
      return circle;
    });
  };

  p.draw = () => {
    p.background(sketchOptions.colors.background);

    const { circles } = state;

    for (const circle of circles) {
      p.fill(circle.color);
      p.stroke(circle.color);
      p.circle(circle.currentPosition.x, circle.currentPosition.y, circle.size);

      if (circle.shouldGrow) {
        for (const otherCircle of circles) {
          if (circle.id === otherCircle.id) {
            continue;
          }

          const padding = 5;
          const distance = getCircleDistance(circle, otherCircle);

          if (distance <= padding) {
            circle.stopGrowing();
          }
        }

        circle.grow();
      }
    }
  };
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

/**
 * Based on Mitchell’s best-candidate algorithm
 * the idea is to approximate a Poisson-disc distribution
 * @see https://bost.ocks.org/mike/algorithms/
 */
const poissonDistribution = (quantity: number) => {
  const circles: Array<Circle> = [];
  const candidates = 20;

  let bestCircle = new Circle();
  bestCircle.currentPosition.x = Infinity;
  bestCircle.currentPosition.y = Infinity;
  let bestDistance = -Infinity;

  for (let index = 0; index < quantity; index++) {
    if (circles.length === 0) {
      circles.push(new Circle());
      continue;
    }

    for (
      let candidateIndex = 0;
      candidateIndex < candidates;
      candidateIndex++
    ) {
      const candidate = new Circle();
      const closestPoint = getClosestCircle(candidate, circles);
      const distance = getCircleDistance(closestPoint, candidate);
      console.log({ distance, bestDistance });
      if (distance > bestDistance) {
        bestDistance = distance;
        bestCircle = candidate;
      }
    }

    circles.push(bestCircle);
    bestCircle = new Circle();
    bestCircle.currentPosition.x = Infinity;
    bestCircle.currentPosition.y = Infinity;
    bestDistance = -Infinity;
  }

  return circles;
};

export const getInitialState = ({
  particleCount = 150,
  getInitialPositions = poissonDistribution,
}: Partial<SketchDeviceConfiguration & SketchOptions> = {}): State => {
  const circles = getInitialPositions(particleCount);

  console.log({ circles });

  return {
    // @ts-ignore
    circles,
  };
};

export { sketch };
