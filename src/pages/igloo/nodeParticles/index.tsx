import React, { useEffect, useMemo, useRef } from 'react';

import { sketch } from '../../../canvas/nodeParticles';
import { useHasMounted } from '../../../hooks/useHasMounted';
import { useWindowSize } from '../../../hooks/useWindowSize';

const renderAnimation = async (container: HTMLDivElement) => {
  const p5 = (await import('p5')).default;
  return new p5(sketch, container);
};

const config = {
  mobile: {
    particleCount: 150,
  },
  desktop: {
    particleCount: 300,
  },
};

const Particles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useWindowSize();
  const hasMounted = useHasMounted();

  const canvasConfig = useMemo(() => {
    if (!dimensions) {
      return undefined;
    }

    if (dimensions.width > 1024) {
      return config.desktop;
    }

    return config.mobile;
  }, [dimensions]);

  useEffect(() => {
    if (!containerRef.current || typeof canvasConfig === 'undefined') {
      return;
    }

    const p5Promise = renderAnimation(containerRef.current);

    return () => {
      p5Promise.then((p5Instance) => {
        p5Instance.remove();
      });
    };
  }, [containerRef, hasMounted]);

  if (!hasMounted || typeof canvasConfig === 'undefined') {
    return null;
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }} ref={containerRef}></div>
  );
};

export default Particles;
