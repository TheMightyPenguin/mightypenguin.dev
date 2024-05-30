import p5 from 'p5';
import { v4 as uuidv4 } from 'uuid';
import colorPalettes from 'nice-color-palettes';
import { BaseSketchOptions } from '../BaseSketchOptions';

const LINE_HEIGHT = 30;
const LINE_WIDTH = 2;
const STEP = 0.01;
const LINE_SPACING = 40;
const BORDER_WIDTH = 10;
let mobileCursor;

export type Point = {
  x: number;
  y: number;
};

export type State = {
  colorDistance: number;
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

export type SketchOptions = BaseSketchOptions & {};

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
    state.colorDistance = p.floor(p.max(p.width, p.height) / 2);
  };

  function getPalette() {
    const palette = p.random(colorPalettes);
    return {
      background: palette[0],
      others: palette.slice(1),
    };
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
    state.colorDistance = p.floor(p.max(p.width, p.height) / 2);

    p.background('white');
    p.setup();
  };

  p.draw = () => {};

  function createLine(originX: number, originY: number) {
    const center = p.createVector(originX, originY - LINE_HEIGHT / 2);
    let angle = p.atan2(p.mouseY - center.y, p.mouseX - center.x);
    let lineColor = getColor();
    let progress = 0;
    let rectParams = {
      x: -LINE_WIDTH / 2,
      y: -LINE_HEIGHT / 2,
      w: LINE_WIDTH,
      h: LINE_HEIGHT,
    };

    function getColor() {
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
  };
};
