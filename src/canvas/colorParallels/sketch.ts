import p5 from 'p5';
import { BaseSketchOptions } from '../BaseSketchOptions';

const LINE_HEIGHT = 30;
const LINE_WIDTH = 2;
const LINE_SPACING = 40;
const BORDER_WIDTH = 0;

export type Point = {
  x: number;
  y: number;
};

export type State = {
  colorDistance: number;
  lines: Array<{
    draw: () => void;
    update: () => void;
  }>;
};

export type SketchOptions = BaseSketchOptions & {};

export const sketch = (sketchOptions: SketchOptions) => (p: p5) => {
  let state: State;

  function onResize() {
    const width =
      sketchOptions.width === 'full'
        ? document.body.clientWidth
        : sketchOptions.width;
    const height =
      sketchOptions.height === 'full'
        ? document.body.clientHeight
        : sketchOptions.height;

    p.resizeCanvas(width, height);
    state = getInitialState({ ...sketchOptions });
    state.colorDistance = p.floor(p.max(p.width, p.height) / 2);
    state.lines = createLines(p);
  }

  p.setup = () => {
    p.createCanvas(0, 0);
    p.colorMode(p.HSB, 360, 100, 100);
    p.angleMode(p.DEGREES);
    onResize();
  };

  p.windowResized = () => {
    onResize();
  };

  p.draw = () => {
    p.background('white');
    for (const line of state.lines) {
      line.draw();
      line.update();
    }
  };

  function createLine(originX: number, originY: number) {
    const center = p.createVector(originX, originY - LINE_HEIGHT / 2);
    let angle = p.atan2(p.mouseY - center.y, p.mouseX - center.x);
    let lineColor = getColor();
    let rectParams = {
      x: -LINE_WIDTH / 2,
      y: -LINE_HEIGHT / 2,
      w: LINE_WIDTH,
      h: LINE_HEIGHT,
    };

    function getColor() {
      // TODO: try lerping the hue value instead and see how it looks
      const distanceToMouse = p.dist(p.mouseX, p.mouseY, center.x, center.y);
      let hue = !p.mouseIsPressed
        ? p.map(distanceToMouse, 0, state.colorDistance, 0, 360)
        : p.map(distanceToMouse, 0, state.colorDistance, 360, 0);
      return p.color(hue, 80, 80);
    }

    return {
      draw() {
        p.push();
        p.strokeWeight(LINE_WIDTH);

        p.stroke(lineColor);
        p.fill(lineColor);

        p.translate(center.x, center.y);
        p.rotate(angle);
        p.rect(rectParams.x, rectParams.y, rectParams.w, rectParams.h, 1);
        p.pop();
      },

      update() {
        let newAngle = p.atan2(p.mouseY - center.y, p.mouseX - center.x);
        angle = radiansLerp(angle, newAngle, 0.3);
        lineColor = p.lerpColor(lineColor, getColor(), 0.2);

        if (p.mouseIsPressed) {
          rectParams.x = p.lerp(rectParams.x, -LINE_HEIGHT / 2, 0.2);
          rectParams.y = p.lerp(rectParams.y, -LINE_WIDTH / 2, 0.2);
          rectParams.w = p.lerp(rectParams.w, LINE_HEIGHT, 0.2);
          rectParams.h = p.lerp(rectParams.h, LINE_WIDTH, 0.2);
        } else {
          rectParams.x = p.lerp(rectParams.x, -LINE_WIDTH / 2, 0.2);
          rectParams.y = p.lerp(rectParams.y, -LINE_HEIGHT / 2, 0.2);
          rectParams.w = p.lerp(rectParams.w, LINE_WIDTH, 0.2);
          rectParams.h = p.lerp(rectParams.h, LINE_HEIGHT, 0.2);
        }
      },
    };
  }

  function radiansLerp(a: number, b: number, w: number) {
    let cs = (1 - w) * p.cos(a) + w * p.cos(b);
    let sn = (1 - w) * p.sin(a) + w * p.sin(b);
    return p.atan2(sn, cs);
  }

  function createLines(p: p5) {
    let lines = [];

    const horizontalSpace = p.windowWidth - BORDER_WIDTH * 2 - 2 * LINE_HEIGHT;
    const verticalSpace = p.windowHeight - BORDER_WIDTH * 2 - 2 * LINE_HEIGHT;

    const startX = BORDER_WIDTH + LINE_HEIGHT;
    const startY = BORDER_WIDTH + LINE_HEIGHT;

    const columns = horizontalSpace / LINE_SPACING;
    const columnsOffset = columns - p.floor(columns);

    const rows = verticalSpace / LINE_HEIGHT / 2;
    const rowsOffset = (rows - p.floor(rows)) / rows;

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        lines.push(
          createLine(
            startX + column * LINE_SPACING + columnsOffset,
            startY + row * 2 * LINE_HEIGHT + LINE_HEIGHT + rowsOffset,
          ),
        );
      }
    }

    return lines;
  }
};

export const renderSketch = (
  container: HTMLDivElement,
  options: SketchOptions,
) => {
  return new p5(sketch(options), container);
};

export const getInitialState = ({}: Partial<SketchOptions> = {}): State => {
  return {
    colorDistance: 0,
    lines: [],
  };
};
