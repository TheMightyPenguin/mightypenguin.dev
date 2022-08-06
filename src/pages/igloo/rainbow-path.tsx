/* eslint-disable @typescript-eslint/no-unused-vars */
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

const RainbowPathPage = () => {
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
      <BackToLink href="/igloo">Back to Igloo</BackToLink>
    </React.Fragment>
  );
};

export default RainbowPathPage;
