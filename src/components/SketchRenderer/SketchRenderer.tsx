'use client';
import React, { useEffect, useRef } from 'react';
import { BaseSketchOptions } from '@/canvas/BaseSketchOptions';

type Props = {
  disableScroll?: boolean;
};

type RenderSketch<T extends BaseSketchOptions> = (
  container: HTMLDivElement,
  options: T,
) => {
  remove: () => void;
};

export function createSketchRenderer<T extends BaseSketchOptions>(
  getRenderSketch: () => Promise<RenderSketch<T>>,
) {
  const SketchRenderer: React.FC<Props & T> = (props) => {
    const { disableScroll = true, ...sketchOptions } = props;

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!containerRef.current) {
        return;
      }

      const p5Promise = getRenderSketch().then((renderSketch) => {
        return renderSketch(containerRef.current!, sketchOptions as T);
      });

      return () => {
        p5Promise.then((p) => p.remove());
      };
    }, [containerRef, sketchOptions]);

    const style: React.CSSProperties = {
      width: sketchOptions.width === 'full' ? '100vw' : sketchOptions.width,
      height: sketchOptions.height === 'full' ? '100vh' : sketchOptions.height,
      touchAction: disableScroll ? 'none' : undefined,
    };

    return <div style={style} ref={containerRef} />;
  };

  return SketchRenderer;
}
