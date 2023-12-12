import { styled } from '@dessert-box/react';

export const MyButton = styled('button', {
  all: 'unset',
  background: 'hotpink',
  borderRadius: '0.25rem',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  margin: '0.5rem',
  ':hover': {
    background: 'red',
  },
});
