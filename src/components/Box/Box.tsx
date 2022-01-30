import { createBox } from '@dessert-box/react';
import React from 'react';

import { atoms } from './atoms.css';

const BaseBox = createBox({ atoms });

// type A =

export type Props = React.ComponentProps<typeof BaseBox>;

export const Box = (props: Props) => {
  return <BaseBox {...props} />;
};

export default Box;
