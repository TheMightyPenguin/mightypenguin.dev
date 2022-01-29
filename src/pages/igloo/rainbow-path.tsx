import React, { ComponentProps, useEffect, useReducer, useState } from 'react';

import BackToLink from '@/components/BackToLink/BackToLink';
import { Box } from '@/components/Box/Box';
import RainbowPath from '@/components/canvas/RainbowPath/RainbowPath';

type Mode = ComponentProps<typeof RainbowPath>['mode'];

function modeReducer(currentState: Mode): Mode {
  return currentState === 'draw' ? 'formula' : 'draw';
}

function useIgnoreScroll() {
  useEffect(() => {
    function preventDefault(event: Event) {
      event.preventDefault();
    }
    window.addEventListener('wheel', preventDefault);
    return () => {
      window.removeEventListener('wheel', preventDefault);
    };
  });
}

const RainbowPathPage = () => {
  const [mode, toggleMode] = useReducer(modeReducer, 'formula');
  const [formula, setFormula] = useState('');

  useIgnoreScroll();

  useEffect(() => {
    document.addEventListener('click', toggleMode);
    return () => {
      document.removeEventListener('click', toggleMode);
    };
  });

  // TODO: implement math formula parsing to JS function
  function parseFormula() {}

  return (
    <React.Fragment>
      <RainbowPath mode={mode} formula="formula" width="full" height="full" />
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
    </React.Fragment>
  );
};

export default RainbowPathPage;
