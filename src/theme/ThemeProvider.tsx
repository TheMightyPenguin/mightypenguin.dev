import { FC, Fragment, PropsWithChildren } from 'react';

const ThemeProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export default ThemeProvider;
