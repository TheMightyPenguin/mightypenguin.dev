import React, { useEffect, useRef } from 'react';

import { sketch } from '../../../canvas/nodeParticles';
import { useHasMounted } from '../../../hooks/useHasMounted';

const renderAnimation = async (container: HTMLDivElement) => {
  const p5 = (await import('p5')).default;
  return new p5(sketch, container);
};

const Particles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasMounted = useHasMounted();

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
  }, [containerRef, hasMounted]);

  if (!hasMounted) {
    return null;
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }} ref={containerRef}></div>
  );
};

export default Particles;
