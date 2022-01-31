/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useReducer } from 'react';

import BackToLink from '@/components/BackToLink/BackToLink';
import PackedDots from '@/components/canvas/PackedDots/PackedDots';
import { useIgnoreScroll } from '@/hooks/useIgnoreScroll';

const PackedDotsPage = () => {
  useIgnoreScroll();
  const [count, increment] = useReducer((c) => c + 1, 0);

  const colors = {
    background: '#fff2f1',
    others: ['#5F00BA', '#A09BE7', '#C03221', '#231F20'],
  };

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
