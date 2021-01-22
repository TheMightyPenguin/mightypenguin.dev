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

  canvas.addEventListener('mousemove', mouseMoveHandler);

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
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Particles;
