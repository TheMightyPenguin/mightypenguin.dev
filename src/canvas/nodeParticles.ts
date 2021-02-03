import p5 from 'p5';
import { v4 as uuidv4 } from 'uuid';

type Point = {
  x: number;
  y: number;
};

type Node = {
  id: string;
  currentPosition: Point;
  originalPosition: Point;
  startPosition: Point;
  movementRadius: number;
  movementProgress: number;
  speed: number;
  targetPosition: Point;
  connected: Node[];
};

type State = {
  nodes: Array<Node>;
  mouse: {
    x: number;
    y: number;
  };
};

const BACKGROUND_COLOR = '#FFFFFF';
const getVertexColor = (alpha: number) => `rgba(0, 0, 0, ${alpha})`;

const SCREEN_BOUNDS = 20;

const getDistance = (p1: Point, p2: Point) => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

const config = {
  mobile: {
    particleCount: 150,
  },
  desktop: {
    particleCount: 300,
  },
};

const getConfig = (width: number) => {
  if (width > 1024) {
    return config.desktop;
  }
  return config.mobile;
};

const sketch = (p: p5) => {
  let state: State;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    const config = getConfig(p.width);
    state = getInitialState(config);
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
    const config = getConfig(p.width);
    state = getInitialState(config);
  };

  // prevent default on touch to prevent scrolling
  p.touchMoved = () => {
    return false;
  };

  p.draw = () => {
    p.background(BACKGROUND_COLOR);

    const { nodes } = state;
    const mouse = { x: p.mouseX, y: p.mouseY };

    // @ts-ignore
    const closestNode: Node = nodes.reduce(
      (closest, current) => {
        const currentToMouse = getDistance(current.currentPosition, mouse);
        const closestToMouse = getDistance(closest.currentPosition, mouse);
        if (currentToMouse < closestToMouse) {
          closest = current;
        }
        return closest;
      },
      { currentPosition: { x: Infinity, y: Infinity } },
    );

    for (const node of nodes) {
      const isClosestNode = node === closestNode;

      if (!isClosestNode) {
        continue;
      }

      const isSameNode = (otherNode: Node) => otherNode === node;

      const paintConnectedNodeLines = (node: Node, luminance = 1) => {
        if (luminance < 1 / 10) {
          return;
        }
        for (const otherNode of node.connected) {
          if (isSameNode(otherNode)) {
            continue;
          }
          p.stroke(getVertexColor(luminance));
          p.line(
            node.currentPosition.x,
            node.currentPosition.y,
            otherNode.currentPosition.x,
            otherNode.currentPosition.y,
          );
          paintConnectedNodeLines(otherNode, luminance / 3);
        }
      };

      paintConnectedNodeLines(node);
    }

    for (const node of nodes) {
      if (node.movementProgress >= 1) {
        node.startPosition.x = node.currentPosition.x;
        node.startPosition.y = node.currentPosition.y;
        node.targetPosition = getTargetPosition(
          node.originalPosition,
          node.movementRadius,
        );
        node.movementProgress = 0;
      } else {
        node.movementProgress += node.speed;
        node.currentPosition.x = lerp(
          node.startPosition.x,
          node.targetPosition.x,
          node.movementProgress,
        );
        node.currentPosition.y = lerp(
          node.startPosition.y,
          node.targetPosition.y,
          node.movementProgress,
        );
      }
    }
  };
};

const getClosestNodes = (
  node: Omit<Node, 'connected'>,
  allNodes: Omit<Node, 'connected'>[],
  closest = 5,
) => {
  return allNodes
    .filter((otherNode) => otherNode !== node)
    .sort((a, b) => {
      const aToNode = getDistance(a.currentPosition, node.currentPosition);
      const bToNode = getDistance(b.currentPosition, node.currentPosition);
      return aToNode - bToNode;
    })
    .slice(0, closest);
};

const getClosestPoint = (point: Point, allPoints: Array<Point>) => {
  return allPoints
    .filter((otherPoint) => otherPoint !== point)
    .sort((a, b) => {
      const aToPoint = getDistance(a, point);
      const bToPoint = getDistance(b, point);
      return aToPoint - bToPoint;
    })
    .slice(0, 1)[0];
};

const getRandomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const randomSign = () => {
  return Math.round(Math.random()) * 2 - 1;
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const getTargetPosition = (origin: Point, movementRadius: number) => {
  return {
    x: clamp(
      origin.x + randomSign() * getRandomInRange(0, movementRadius),
      SCREEN_BOUNDS,
      window.innerWidth - SCREEN_BOUNDS,
    ),
    y: clamp(
      origin.y + randomSign() * getRandomInRange(0, movementRadius),
      SCREEN_BOUNDS,
      window.innerHeight - SCREEN_BOUNDS,
    ),
  };
};

const getRandomPoint = (): Point => ({
  x: getRandomInRange(SCREEN_BOUNDS, window.innerWidth - SCREEN_BOUNDS),
  y: getRandomInRange(SCREEN_BOUNDS, window.innerHeight - SCREEN_BOUNDS),
});

/**
 * Based on Mitchell’s best-candidate algorithm
 * the idea is to approximate a Poisson-disc distribution
 * @see https://bost.ocks.org/mike/algorithms/
 */
const getInitialPositions = (quantity: number) => {
  const positions: Array<Point> = [];
  const candidates = 20;

  let bestPoint = { x: Infinity, y: Infinity };
  let bestDistance = -Infinity;

  for (let index = 0; index < quantity; index++) {
    if (positions.length === 0) {
      positions.push(getRandomPoint());
      continue;
    }

    for (
      let candidateIndex = 0;
      candidateIndex < candidates;
      candidateIndex++
    ) {
      const candidate = getRandomPoint();
      const closestPoint = getClosestPoint(candidate, positions);
      const distance = getDistance(closestPoint, candidate);
      if (distance > bestDistance) {
        bestDistance = distance;
        bestPoint = candidate;
      }
    }

    positions.push(bestPoint);
    bestPoint = { x: Infinity, y: Infinity };
    bestDistance = -Infinity;
  }

  return positions;
};

const getRandomNodes = (quantity: number) => {
  return getInitialPositions(quantity).map(({ x, y }) => {
    const movementRadius = 20;
    return {
      id: uuidv4(),
      movementRadius,
      speed: getRandomInRange(0.001, 0.003),
      currentPosition: { x, y },
      startPosition: { x, y },
      movementProgress: 0,
      targetPosition: getTargetPosition({ x, y }, movementRadius),
      originalPosition: {
        x,
        y,
      },
    };
  });
};

export type Config = {
  particleCount: number;
};

const getInitialState = ({
  particleCount = 150,
}: Partial<Config> = {}): State => {
  const nodes = getRandomNodes(particleCount).map(
    (node, _index, collection) => {
      // @ts-ignore
      node.connected = getClosestNodes(node, collection);
      return node;
    },
  );

  return {
    // @ts-ignore
    nodes,
    mouse: { x: 0, y: 0 },
  };
};

export { sketch };
