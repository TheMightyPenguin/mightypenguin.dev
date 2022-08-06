/* eslint-disable jsx-a11y/click-events-have-key-events */
import colorPalettes from 'nice-color-palettes';
import React, { useMemo, useReducer } from 'react';

import BackToLink from '@/components/BackToLink/BackToLink';
import PackedDots from '@/components/canvas/PackedDots/PackedDots';
import { useIgnoreScroll } from '@/hooks/useIgnoreScroll';

const PackedDotsPage = () => {
  useIgnoreScroll();
  const [count, increment] = useReducer((c) => c + 1, 0);

  const colors = useMemo(() => {
    const palette =
      colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    return {
      background: palette[0],
      others: palette.slice(1),
    };
  }, [count]);

  return (
    <React.Fragment>
      <div
        style={{ cursor: 'pointer' }}
        onClick={increment}
        role="button"
        aria-label="regenerate"
        tabIndex={0}
      >
        <PackedDots key={count} colors={colors} width="full" height="full" />
      </div>
      <BackToLink href="/igloo">Back to Igloo</BackToLink>
    </React.Fragment>
  );
};

export default PackedDotsPage;
