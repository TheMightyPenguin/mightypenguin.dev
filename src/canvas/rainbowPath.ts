import p5 from 'p5';
import { getStroke } from 'perfect-freehand';

const BACKGROUND_COLOR = '#FFFFFF';
const LINE_SIZE = 10;

export type BaseSketchOptions = {
  width: 'full' | number;
  height: 'full' | number;
};

export type SketchOptions = BaseSketchOptions & {
  mode: 'draw' | 'formula';
  getCursorFn: GetPositionFn;
};

type GetPositionFn = (deltaTime: number) => number;

type CursorFn = (deltaTime: number) => [x: number, y: number];

const sketch = (sketchOptions: SketchOptions) => (p: p5) => {
  const mode = sketchOptions.mode;
  const getCursorFn: CursorFn =
    mode === 'draw'
      ? () => [p.mouseX, p.mouseY]
      : (x: number) => [x, sketchOptions.getCursorFn(x) * 100 + p.height / 2];
  const brush = new Brush(p, getCursorFn);

  const getCanvasDimensions = () => {
    const width =
      sketchOptions.width === 'full'
        ? document.body.clientWidth
        : sketchOptions.width;
    const height =
      sketchOptions.height === 'full'
        ? document.body.clientHeight
        : sketchOptions.height;
    return { width, height };
  };

  p.setup = () => {
    const { width, height } = getCanvasDimensions();
    p.createCanvas(width, height);
  };

  p.windowResized = () => {
    const { width, height } = getCanvasDimensions();
    p.resizeCanvas(width, height);
  };

  p.draw = () => {
    p.background(BACKGROUND_COLOR);
    brush.update();
    brush.draw();
  };
};

export { sketch };

class Brush {
  private prevMousePositions: Array<[x: number, y: number]> = [];
  private memory = 30;
  private colors: Array<p5.Color>;
  private x = 0;

  constructor(private p: p5, private getCursor: CursorFn) {
    this.colors = [
      p.color(20, 36, 133),
      p.color(28, 54, 117),
      p.color(24, 66, 78),
      p.color(29, 92, 55),
      p.color(63, 138, 59),
      p.color(119, 184, 54),
      p.color(225, 218, 51),
      p.color(220, 180, 34),
      p.color(212, 114, 11),
      p.color(161, 36, 10),
      p.color(127, 19, 18),
      p.color(86, 29, 46),
      p.color(68, 36, 52),
      p.color(59, 46, 91),
    ];
  }

  update() {
    const p = this.p;
    this.x = this.x + p.deltaTime * 0.001 * 400;

    if (this.x > p.width + 400) {
      this.prevMousePositions.length = 0;
      this.x = 0;
    }

    if (this.prevMousePositions.length > this.memory) {
      this.prevMousePositions.shift();
    }

    const [x, y] = this.getCursor(this.x);
    this.prevMousePositions.push([x, y]);
  }

  getPathDefinition(offset: number) {
    const smoothStroke = getStroke(this.prevMousePositions);

    const pathString = smoothStroke
      .map(([x, y]) => [x, y + offset * (LINE_SIZE - 2)])
      .reduce(
        (acc, [x0, y0], i, arr) => {
          const [x1, y1] = arr[(i + 1) % arr.length];
          acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
          return acc;
        },
        ['M', ...smoothStroke[0], 'Q'],
      );

    pathString.push('Z');
    return new Path2D(pathString.join(' '));
  }

  draw() {
    const p = this.p;
    // @ts-ignore
    const ctx = p.drawingContext as CanvasRenderingContext2D;
    p.push();
    p.stroke(0);
    p.fill(0);
    p.strokeWeight(LINE_SIZE);

    for (let i = 0; i < this.colors.length; i++) {
      const color = this.colors[i];
      const half = p.floor(this.colors.length / 2);
      const offset = i - half;
      p.stroke(color);
      p.fill(color);
      const path = this.getPathDefinition(offset);
      ctx.fill(path);
    }

    p.pop();
  }
}
