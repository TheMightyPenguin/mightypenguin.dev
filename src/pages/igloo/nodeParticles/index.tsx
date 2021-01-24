import React, { useEffect, useMemo, useRef } from 'react';

import { getInitialState, renderFrame } from '../../../canvas/nodeParticles';
import { useHasMounted } from '../../../hooks/useHasMounted';
import { useWindowSize } from '../../../hooks/useWindowSize';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const renderAnimation = (
  canvas: HTMLCanvasElement,
  config: { scale: number; particleCount: number },
) => {
  let keepRunning = true;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (!ctx) {
    return noop;
  }

  const state = getInitialState(config.scale);

  const mouseMoveHandler = (event: MouseEvent) => {
    state.mouse.x = event.offsetX;
    state.mouse.y = event.offsetY;
  };

  const touchMoveHandler = (event: TouchEvent) => {
    const touch = event.touches.item(0);
    event.preventDefault();

    if (!touch) {
      return;
    }

    state.mouse.x = touch.clientX;
    state.mouse.y = touch.clientY;
  };

  canvas.addEventListener('mousemove', mouseMoveHandler);
  canvas.addEventListener('touchmove', touchMoveHandler);

  const update = () => {
    renderFrame(ctx, state);
    if (keepRunning) {
      window.requestAnimationFrame(update);
    }
  };

  window.requestAnimationFrame(update);

  return () => {
    keepRunning = false;
    canvas.removeEventListener('mousemove', mouseMoveHandler);
    canvas.removeEventListener('touchmove', touchMoveHandler);
  };
};

const config = {
  mobile: {
    particleCount: 150,
    scale: 1,
    lineWidth: 1,
  },
  desktop: {
    particleCount: 300,
    scale: 1,
    lineWidth: 1,
  },
};

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    if (!canvasRef.current || typeof canvasConfig === 'undefined') {
      return;
    }

    const unsubscribe = renderAnimation(canvasRef.current, canvasConfig);

    return () => {
      unsubscribe();
    };
  }, [canvasRef, canvasConfig, hasMounted]);

  if (!hasMounted || typeof canvasConfig === 'undefined') {
    return null;
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <canvas
        ref={canvasRef}
        style={{
          transform: `scale3D(${canvasConfig.scale}, ${canvasConfig.scale}, ${canvasConfig.scale})`,
          transformOrigin: '0 0',
        }}
      />
    </div>
  );
};

export default Particles;
