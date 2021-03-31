import React from 'react';

import NodeParticles from '@/components/canvas/NodeParticles/NodeParticles';
import Footer from '@/components/Footer/Footer';

const Particles = () => {
  return (
    <React.Fragment>
      <NodeParticles width="full" height="full" />;
      <Footer overlay />
    </React.Fragment>
  );
};

export default Particles;
