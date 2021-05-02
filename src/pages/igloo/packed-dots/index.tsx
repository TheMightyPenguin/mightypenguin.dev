import React from 'react';

import PackedDots from '@/components/canvas/PackedDots/PackedDots';
import Footer from '@/components/Footer/Footer';

const PackedDotsPage = () => {
  const colors = {
    background: '#fff2f1',
    others: ['#5F00BA', '#A09BE7', '#C03221', '#231F20'],
  };

  return (
    <React.Fragment>
      <PackedDots colors={colors} width="full" height="full" />
      <Footer overlay />
    </React.Fragment>
  );
};

export default PackedDotsPage;
