import { Properties } from 'csstype';
import mapValues from 'lodash/mapValues';
import { style, styleMap } from 'treat';

import { Spaces, Theme } from '../../theme/types';

export const reset = style({
  margin: 0,
});

const spaceValueToStyle = (propertyName: keyof Properties) => (
  theme: Theme,
) => {
  return mapValues(theme.spaces, (value) => {
    return {
      [propertyName]: value,
    };
  });
};

// @ts-ignore
export const padding = {
  top: styleMap((theme) => spaceValueToStyle('paddingTop')(theme)),
};
