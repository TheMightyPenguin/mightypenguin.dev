'use client';
import React, { useEffect, useState } from 'react';

import Footer from '@/components/Footer/Footer';
import { useIgnoreScroll } from '@/hooks/useIgnoreScroll';
import { createSketchRenderer } from '@/components/SketchRenderer/SketchRenderer';

import { renderSketch } from '@/canvas/nodeParticles/sketch';

const NodeParticles = createSketchRenderer(renderSketch);

const useRemoveOnInteraction = () => {
  useIgnoreScroll();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timeoutId: number | undefined;

    const handleEvent = () => {
      if (timeoutId) {
        return;
      }
      timeoutId = window.setTimeout(() => setShow(false), 3000);
    };

    window.addEventListener('mousemove', handleEvent);
    window.addEventListener('touchstart', handleEvent);

    return () => {
      window.removeEventListener('mousemove', handleEvent);
      window.removeEventListener('touchstart', handleEvent);
    };
  }, []);

  return show;
};

const Particles = () => {
  const show = useRemoveOnInteraction();
  return (
    <React.Fragment>
      <NodeParticles width="full" height="full" />
      <div
        style={{
          position: 'fixed',
          bottom: '4rem',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 400,
          zIndex: 10,
          pointerEvents: 'none',
          opacity: show ? 1 : 0,
          transition: 'opacity 150ms ease-in-out',
        }}
      >
        Psst, move your mouse around (or touch around).
      </div>
      <Footer overlay />
    </React.Fragment>
  );
};

export default Particles;
