import { createBox } from 'dessert-box';
import React from 'react';

import { atoms } from './atoms.css';

const BaseBox = createBox(atoms);

export type Props = React.ComponentProps<typeof BaseBox>;

const Box = (props: Props) => {
  return <BaseBox {...props} />;
};

export default Box;
