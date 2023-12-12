import type { MathJsStatic } from 'mathjs';
import React, { ComponentProps, useEffect, useReducer, useState } from 'react';

import BackToLink from '@/components/BackToLink/BackToLink';
import RainbowPath from '@/components/canvas/RainbowPath/RainbowPath';
import { useIgnoreScroll } from '@/hooks/useIgnoreScroll';

type Mode = ComponentProps<typeof RainbowPath>['mode'];
type ParsedFormula = ComponentProps<typeof RainbowPath>['getCursorFn'];

function modeReducer(currentState: Mode): Mode {
  return currentState === 'draw' ? 'formula' : 'draw';
}

const useRemoveOnInteraction = () => {
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

const RainbowPathPage = () => {
  const show = useRemoveOnInteraction();
  const [mode, toggleMode] = useReducer(modeReducer, 'draw');
  const [formula, setFormula] = useState('sin(x / 55)');
  const [parsedFormula, setParsedFormula] = useState<ParsedFormula>(
    () => (x: number) => Math.sin(x / 55),
  );
  const [math, setMath] = useState<MathJsStatic | undefined>(undefined);

  useIgnoreScroll();

  useEffect(() => {
    // load mathjs lazily
    import('mathjs').then(setMath);
  }, []);

  // TODO: implement formula based movement?
  const parseFormula: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!math) return '';
    setFormula(event.target.value);
    try {
      const pf = math.compile(event.target.value);
      pf.evaluate({ x: 0 });
      const fn = (x: number) => {
        try {
          return pf.evaluate({ x });
        } catch (e) {
          return 0;
        }
      };
      setParsedFormula(() => fn);
    } catch (e) {
      return (x: number) => x;
    }
  };

  return (
    <React.Fragment>
      <RainbowPath
        mode={mode}
        getCursorFn={parsedFormula}
        width="full"
        height="full"
      />
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
      <BackToLink href="/igloo">Back to Igloo</BackToLink>
    </React.Fragment>
  );
};

export default RainbowPathPage;
