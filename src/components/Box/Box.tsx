import classNames from 'classnames';
import { Property } from 'csstype';
import React from 'react';
import { useStyles } from 'react-treat';

import { Theme } from '../../theme/types';
import * as styleRefs from './Box.treat';

export type Props = {
  as?: React.ElementType;

  padding?: keyof Theme['spaces'];
  paddingTop?: keyof Theme['spaces'];
  paddingBottom?: keyof Theme['spaces'];
  paddingRight?: keyof Theme['spaces'];
  paddingLeft?: keyof Theme['spaces'];

  // size
  maxWidth?: Property.MaxWidth;

  display?: keyof typeof styleRefs.display;

  // flex
  flexDirection?: keyof typeof styleRefs.flexDirection;
  justifyContent?: keyof typeof styleRefs.justifyContent;
  alignItems?: keyof typeof styleRefs.alignItems;
  flexWrap?: keyof typeof styleRefs.flexWrap;
};

const Box: React.FC<Props> = ({
  as: Component = 'div',
  padding,
  paddingTop,
  paddingBottom,
  paddingRight,
  paddingLeft,
  maxWidth,
  display,
  flexDirection,
  justifyContent,
  alignItems,
  flexWrap,
  ...rest
}: Props) => {
  const styles = useStyles(styleRefs);

  const className = classNames(
    styles.padding.top[paddingTop ?? padding!],
    styles.padding.bottom[paddingBottom ?? padding!],
    styles.padding.right[paddingRight ?? padding!],
    styles.padding.left[paddingLeft ?? padding!],
    styles.display[display!],
    styles.flexDirection[flexDirection!],
    styles.justifyContent[justifyContent!],
    styles.alignItems[alignItems!],
    styles.flexWrap[flexWrap!],
    styles.reset,
  );

  return <Component className={className} style={{ maxWidth }} {...rest} />;
};

export default Box;
