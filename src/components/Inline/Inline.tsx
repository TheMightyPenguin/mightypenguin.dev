import React, { Children, cloneElement, isValidElement } from 'react';

import Box, { Props as BoxProps } from '@/components/Box/Box';
import { HorizontalAlignment, Theme, VerticalAlignment } from '@/theme/types';

type Props = {
  space: keyof Theme['spaces'];
  xAlign?: HorizontalAlignment;
  yAlign?: VerticalAlignment;
};

const horizontalAlignmentToFlex: Record<
  HorizontalAlignment,
  BoxProps['justifyContent']
> = {
  full: undefined,
  left: 'flexStart',
  center: 'center',
  right: 'flexEnd',
  spaced: 'spaced',
};

const verticalAlignmentToFlex: Record<
  VerticalAlignment,
  BoxProps['alignItems']
> = {
  top: 'flexStart',
  center: 'center',
  bottom: 'flexEnd',
};

const Inline: React.FC<Props> = ({ children, space, xAlign, yAlign }) => {
  return (
    <Box
      justifyContent={horizontalAlignmentToFlex[xAlign!]}
      alignItems={verticalAlignmentToFlex[yAlign!]}
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return null;
        }
        return (
          <Box paddingLeft={index === 0 ? undefined : space}>
            {cloneElement(child, child.props, child.props.children)}
          </Box>
        );
      })}
    </Box>
  );
};

export default Inline;
