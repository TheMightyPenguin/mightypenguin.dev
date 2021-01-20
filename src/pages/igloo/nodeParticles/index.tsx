import React, { useEffect, useRef } from 'react';

const renderAnimation = (canvas: HTMLCanvasElement) => {
  let keepRunning = true;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return () => {};
  }

  const update = () => {
    ctx.fillStyle = 'black';

    ctx.fillRect(0, 0, window.innerHeight, window.innerHeight);

    if (keepRunning) {
      window.requestAnimationFrame(update);
    }
  };

  window.requestAnimationFrame(update);

  return () => {
    keepRunning = false;
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
