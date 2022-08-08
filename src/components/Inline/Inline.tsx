import React, {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
} from 'react';

import Box, { Props as BoxProps } from '@/components/Box/Box';
import { HorizontalAlignment, VerticalAlignment } from '@/theme/types';

type Props = PropsWithChildren<{
  space: React.ComponentProps<typeof Box>['paddingLeft'];
  xAlign?: HorizontalAlignment;
  yAlign?: VerticalAlignment;
}>;

const horizontalAlignmentToFlex: Record<
  HorizontalAlignment,
  BoxProps['justifyContent']
> = {
  full: undefined,
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  spaced: 'space-between',
};

const verticalAlignmentToFlex: Record<
  VerticalAlignment,
  BoxProps['alignItems']
> = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
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
