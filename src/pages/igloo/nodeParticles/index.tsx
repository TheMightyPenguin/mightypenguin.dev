import React, { useEffect, useRef } from 'react';

import { getInitialState, renderFrame } from '../../../canvas/nodeParticles';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const renderAnimation = (canvas: HTMLCanvasElement) => {
  let keepRunning = true;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (!ctx) {
    return noop;
  }

  const state = getInitialState();

  const mouseMoveHandler = (event: MouseEvent) => {
    state.mouse.x = event.offsetX;
    state.mouse.y = event.offsetY;
  };

  const touchMoveHandler = (event: TouchEvent) => {
    const touch = event.touches.item(1);
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

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const unsubscribe = renderAnimation(canvasRef.current);

    return () => {
      unsubscribe();
    };
  }, [canvasRef]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Particles;
