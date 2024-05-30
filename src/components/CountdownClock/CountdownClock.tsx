'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CSSProperties, useEffect, useState } from 'react';

export const CountdownClock = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => {
      window.clearInterval(id);
    };
  }, []);

  return (
    <div>
      <div style={{ padding: '16px', backgroundColor: '#111' }}>
        <FlexibleApproach.SegmentGroup value={count} />
      </div>
    </div>
  );
};

const animationStates = {
  initial: {
    y: -24,
    opacity: 0.3,
    scaleY: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    scaleY: 1,
  },
  exit: {
    y: 24,
    opacity: 0.3,
    scaleY: 0,
  },
};

const cellStyle: CSSProperties = {
  fontSize: '16px',
  fontFamily: 'monospace',
  position: 'absolute',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const FlexibleApproach = {
  SegmentGroup: function SegmentGroup({ value }: { value: number }) {
    const sectionedCount = value
      .toString()
      .padStart(2, '0')
      .split('')
      .map((digit) => parseInt(digit, 10))
      .map((digit, index) => {
        return (
          <div
            key={`${'-'.repeat(index)}_${digit}`}
            style={{
              borderLeft: index > 0 ? '1px solid #333' : undefined,
              color: '#555',
              width: '20px',
              height: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <FlexibleApproach.Segment digit={digit} />
          </div>
        );
      });

    return (
      <div
        style={{
          border: '1px solid gray',
          borderRadius: '4px',
          display: 'inline-flex',
          marginLeft: '100px',
          backgroundColor: '#000',
        }}
      >
        {sectionedCount}
      </div>
    );
  },

  Segment: function Segment({ digit }: { digit: number }) {
    const prevDigit = Math.max(digit - 1, 0);
    return (
      <>
        <motion.span
          // key={prevDigit}
          style={cellStyle}
          transition={{
            type: 'linear',
            duration: 0.3,
          }}
          initial={animationStates.animate}
          animate={animationStates.exit}
        >
          {prevDigit}
        </motion.span>
        <motion.span
          // key={digit}
          style={cellStyle}
          transition={{
            type: 'linear',
            duration: 0.3,
          }}
          initial={animationStates.initial}
          animate={animationStates.animate}
        >
          {digit}
        </motion.span>
      </>
    );
  },
};

function Segment({ value }: { value: number }) {
  return (
    <AnimatePresence>
      <motion.span
        key={`current-${value}`}
        style={{ fontSize: '16px', fontFamily: 'monospace' }}
        transition={{
          type: 'linear',
          duration: 0.3,
        }}
        initial={{
          // y: -24,
          opacity: 0.3,
        }}
        animate={{
          // y: 0,
          opacity: 1,
        }}
        exit={{
          // y: 0,
          opacity: 0.3,
        }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

const SegmentGroup = () => {};
