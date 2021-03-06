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

type Props = SketchOptions & {
  disableScroll?: boolean;
};

const NodeParticles: React.FC<Props> = ({
  disableScroll = true,
  ...sketchOptions
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  const style: React.CSSProperties = {
    width: sketchOptions.width === 'full' ? '100vw' : sketchOptions.width,
    height: sketchOptions.height === 'full' ? '100vh' : sketchOptions.height,
    touchAction: disableScroll ? 'none' : undefined,
  };

  return <div style={style} ref={containerRef} />;
};

export default NodeParticles;
