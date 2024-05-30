'use client';
import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [size, setSize] = useState(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    const resizeHandler = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', resizeHandler);

    resizeHandler();

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return size;
};
