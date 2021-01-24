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

const getDistance = (p1: Point, p2: Point) => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

const renderFrame = (ctx: CanvasRenderingContext2D, state: State) => {
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);

  const { nodes, mouse } = state;

  // @ts-ignore
  const closestNode: Node = nodes.reduce(
    (closest, current) => {
      const currentToMouse = getDistance(current.currentPosition, mouse);
      const closestToMouse = getDistance(closest.currentPosition, mouse);
      if (currentToMouse < closestToMouse) {
        // @ts-ignore
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
        ctx.save();
        ctx.beginPath();
        ctx.translate(0.5, 0.5);
        ctx.strokeStyle = getVertexColor(luminance);
        ctx.moveTo(node.currentPosition.x, node.currentPosition.y);
        ctx.lineTo(otherNode.currentPosition.x, otherNode.currentPosition.y);
        ctx.stroke();
        ctx.restore();
        paintConnectedNodeLines(otherNode, luminance / 3);
      }
    };

    paintConnectedNodeLines(node);
  }

  for (const node of nodes) {
    if (isPointEqualWithDelta(node.currentPosition, node.targetPosition)) {
      node.startPosition = node.targetPosition;
      node.targetPosition = getTargetPosition(
        node.originalPosition,
        node.movementRadius,
      );
      node.movementProgress = 0;
    } else {
      node.movementProgress += 0.004;
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

const isPointEqualWithDelta = (a: Point, b: Point) => {
  return isEqualWithDelta(a.x, b.x) && isEqualWithDelta(a.y, b.y);
};

const isEqualWithDelta = (a: number, b: number, delta = 0.01) => {
  return Math.abs(a - b) <= delta;
};

const getClosestNodes = (
  node: Omit<Node, 'connected'>,
  allNodes: Omit<Node, 'connected'>[],
  closest = 5,
) => {
  return [...allNodes]
    .filter((otherNode) => otherNode !== node)
    .sort((a, b) => {
      const aToNode = getDistance(a.currentPosition, node.currentPosition);
      const bToNode = getDistance(b.currentPosition, node.currentPosition);
      return aToNode - bToNode;
    })
    .slice(0, closest);
};

const getRandomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const getTargetPosition = (origin: Point, movementRadius: number) => {
  return {
    x: origin.x + getRandomInRange(0, movementRadius),
    y: origin.y + getRandomInRange(0, movementRadius),
  };
};

const getRandomNodes = (quantity = 300) => {
  return Array.from({ length: quantity })
    .fill(undefined)
    .map(() => {
      const x = getRandomInRange(20, window.innerWidth - 20);
      const y = getRandomInRange(20, window.innerHeight - 20);
      const movementRadius = 40;
      return {
        id: uuidv4(),
        movementRadius,
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

const getInitialState = (): State => {
  const nodes = getRandomNodes().map((node, _index, collection) => {
    // @ts-ignore
    node.connected = getClosestNodes(node, collection);
    return node;
  });

  return {
    // @ts-ignore
    nodes,
    mouse: { x: 0, y: 0 },
  };
};

export { getInitialState, renderFrame };
