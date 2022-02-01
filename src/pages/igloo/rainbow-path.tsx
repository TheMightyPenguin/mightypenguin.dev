import type { MathJsStatic } from 'mathjs';
import React, { ComponentProps, useEffect, useReducer, useState } from 'react';

import BackToLink from '@/components/BackToLink/BackToLink';
import { Box } from '@/components/Box/Box';
import RainbowPath from '@/components/canvas/RainbowPath/RainbowPath';
import { useIgnoreScroll } from '@/hooks/useIgnoreScroll';

type Mode = ComponentProps<typeof RainbowPath>['mode'];
type ParsedFormula = ComponentProps<typeof RainbowPath>['getCursorFn'];

function modeReducer(currentState: Mode): Mode {
  return currentState === 'draw' ? 'formula' : 'draw';
}

const RainbowPathPage = () => {
  const [mode, toggleMode] = useReducer(modeReducer, 'formula');
  const [formula, setFormula] = useState('sin(x / 55)');
  const [parsedFormula, setParsedFormula] = useState<ParsedFormula>(
    () => (x: number) => Math.sin(x / 55),
  );
  const [math, setMath] = useState<MathJsStatic | undefined>(undefined);

  useIgnoreScroll();

  useEffect(() => {
    document.addEventListener('click', toggleMode);
    return () => {
      document.removeEventListener('click', toggleMode);
    };
  });

  useEffect(() => {
    // load mathjs lazily
    import('mathjs').then(setMath);
  }, []);

  // TODO: implement math formula parsing to JS function
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
      <BackToLink href="/igloo">Back to Igloo</BackToLink>
      <Box
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '32px',
          background: 'white',
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.25)',
          padding: '16px',
          borderRadius: '6px',
          userSelect: 'none',
        }}
        onClick={() => toggleMode()}
      >
        Click to toggle draw/visualize
        <div>Mode: {mode === 'draw' ? 'Draw' : 'Visualize'}</div>
      </Box>
      <Box
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '50%',
          background: 'white',
          transform: 'translateX(-50%)',
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.25)',
          padding: '16px',
          borderRadius: '6px',
          userSelect: 'none',
        }}
      >
        <input
          onClick={(e) => {
            e.stopPropagation();
          }}
          value={formula}
          onChange={parseFormula}
        />
      </Box>
    </React.Fragment>
  );
};

export default RainbowPathPage;
