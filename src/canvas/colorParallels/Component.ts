'use client';
import { createSketchRenderer } from '@/components/SketchRenderer/SketchRenderer';

const ColorParallels = createSketchRenderer(() =>
  import('@/canvas/colorParallels/sketch').then((m) => m.renderSketch),
);

export default ColorParallels;
