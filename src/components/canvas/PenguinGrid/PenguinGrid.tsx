import React, { useEffect, useRef } from 'react';

import { sketch } from '@/canvas/penguinGrid';

const renderAnimation = async (container: HTMLDivElement) => {
  const p5 = (await import('p5')).default;
  return new p5(sketch(), container);
};

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const PenguinGrid: React.FC<Props> = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const p5Promise = renderAnimation(containerRef.current);

    return () => {
      p5Promise.then((p5Instance) => {
        p5Instance.remove();
      });
    };
  }, [containerRef]);

  const style: React.CSSProperties = {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
  };

  return <div style={style} ref={containerRef} />;
};

export default PenguinGrid;
