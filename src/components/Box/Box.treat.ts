import { Properties } from 'csstype';
import mapValues from 'lodash/mapValues';
import { style, styleMap } from 'treat';

import { Theme } from '../../theme/types';

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

export const padding = {
  top: styleMap((theme) => spaceValueToStyle('paddingTop')(theme)),
  bottom: styleMap((theme) => spaceValueToStyle('paddingBottom')(theme)),
  right: styleMap((theme) => spaceValueToStyle('paddingRight')(theme)),
  left: styleMap((theme) => spaceValueToStyle('paddingLeft')(theme)),
};

export const display = styleMap(() => ({
  flex: { display: 'flex' },
  block: { display: 'block' },
  flexInline: { display: 'inline-flex' },
}));

export const flexDirection = styleMap(() => ({
  column: { flexDirection: 'column' },
  row: { flexDirection: 'row' },
}));

export const justifyContent = styleMap(() => ({
  flexStart: { justifyContent: 'flex-start' },
  center: { justifyContent: 'center' },
  flexEnd: { justifyContent: 'flex-end' },
}));

export const alignItems = styleMap(() => ({
  flexStart: { justifyContent: 'flex-start' },
  center: { justifyContent: 'center' },
  flexEnd: { justifyContent: 'flex-end' },
}));
