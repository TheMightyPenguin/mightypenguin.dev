import React, { useEffect, useRef } from 'react';

import { sketch, SketchOptions } from '@/canvas/nodeParticles';

const renderAnimation = async (
  container: HTMLDivElement,
  sketchOptions: SketchOptions = {
    width: 'full',
    height: 'full',
  },
) => {
  const p5 = (await import('p5')).default;
  return new p5(sketch(sketchOptions), container);
};

type Props = SketchOptions;

const NodeParticles: React.FC<Props> = (sketchOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const disableScroll: React.TouchEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const p5Promise = renderAnimation(containerRef.current, sketchOptions);

    return () => {
      p5Promise.then((p5Instance) => {
        p5Instance.remove();
      });
    };
  }, [containerRef]);

  const style = {
    width: sketchOptions.width === 'full' ? '100vw' : sketchOptions.width,
    height: sketchOptions.height === 'full' ? '100vh' : sketchOptions.height,
  };

  return <div onTouchMove={disableScroll} style={style} ref={containerRef} />;
};

export default NodeParticles;
