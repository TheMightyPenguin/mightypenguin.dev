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
  renderSketch: RenderSketch<T>,
) {
  const SketchRenderer: React.FC<Props & T> = (props) => {
    const { disableScroll = true, ...sketchOptions } = props;

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!containerRef.current) {
        return;
      }

      const p5Promise = renderSketch(containerRef.current, sketchOptions as T);

      return () => {
        p5Promise.remove();
        // p5Promise.then((p5Instance) => {
        //   p5Instance.remove();
        // });
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

// export function useLoadSketch(loader: () => Promise<any>) {
//   const [sketch, setSketch] = React.useState<RenderSketch<any> | undefined>(
//     undefined,
//   );

//   useEffect(() => {
//     import(`@/canvas/${path}/sketch`).then((module) => {
//       setSketch(module.sketch);
//     });
//   }, [path]);

//   return sketch;
// }

// export function useSketchRenderer<T extends BaseSketchOptions>(path: string) {
//   const sketch = useLoadSketch(path);

//   if (!sketch) {
//     return null;
//   }

//   return createSketchRenderer<T>(sketch);
// }
