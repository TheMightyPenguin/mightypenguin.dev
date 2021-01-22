import { closestTo } from 'date-fns';
import { close } from 'inspector';

type Point = {
  x: number;
  y: number;
};

type Node = {
  x: number;
  y: number;
  connected: Node[];
};

type State = {
  nodes: Array<Node>;
  mouse: {
    x: number;
    y: number;
  };
};

const getDistance = (p1: Point, p2: Point) => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

const renderFrame = (ctx: CanvasRenderingContext2D, state: State) => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, window.innerHeight, window.innerHeight);

  const { nodes, mouse } = state;

  const closestNode = nodes.reduce(
    (closest, current) => {
      const currentToMouse = getDistance(current, mouse);
      const closestToMouse = getDistance(closest, mouse);
      if (currentToMouse < closestToMouse) {
        closest = current;
      }
      return closest;
    },
    { x: Infinity, y: Infinity },
  );

  ctx.save();
  ctx.fillStyle = 'green';
  ctx.font = '30px Verdana';
  ctx.fillText(`${mouse.x}, ${mouse.y}`, 50, 50);
  ctx.restore();

  for (const node of nodes) {
    ctx.save();

    const isClosestNode = node === closestNode;

    ctx.beginPath();
    ctx.fillStyle = isClosestNode ? 'red' : 'blue';
    ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();

    if (isClosestNode) {
      for (const otherNode of node.connected) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'green';
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(otherNode.x, otherNode.y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
};

const getClosestNodes = (node: Point, allNodes: Point[], closest = 5) => {
  return [...allNodes]
    .filter((otherNode) => otherNode !== node)
    .sort((a, b) => {
      const aToNode = getDistance(a, node);
      const bToNode = getDistance(b, node);
      return aToNode - bToNode;
    })
    .slice(0, closest);
};

function getRandomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const getRandomNodes = (quantity = 100) => {
  return Array.from({ length: quantity })
    .fill(undefined)
    .map(() => {
      return {
        x: getRandomInRange(20, window.innerWidth - 20),
        y: getRandomInRange(20, window.innerHeight - 20),
      };
    });
};

const getInitialState = (): State => {
  const nodes: Node[] = getRandomNodes().map((node, _index, collection) => {
    // @ts-ignore
    node.connected = getClosestNodes(node, collection);
    return node;
  });

  return {
    nodes,
    mouse: { x: 0, y: 0 },
  };
};

export { getInitialState, renderFrame };
