import {
  crimson,
  gray,
  lime,
  mauve,
  mauveDark,
  mint,
  orange,
  sky,
  tomato,
} from '@radix-ui/colors';
import { createGlobalTheme } from '@vanilla-extract/css';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { modularScale } from 'polished';

const createScale = (ratio: number, base: number) => (steps: number) =>
  `${modularScale(steps, base, ratio)}px`;

const spaceScale = createScale(1.4, 4);
const fontSizeScale = createScale(1.3, 16);
const lineHeightScale = createScale(1.25, 24);
const borderRadiusScale = createScale(1.5, 4);

const rawColors = {
  crimson,
  mauve,
  mauveDark,
  gray,
  mint,
  sky,
  lime,
  orange,
  tomato,
};

type ColorSteps =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

type ColorUseCases =
  | 'Background'
  | 'SubtleBackground'
  | 'ElementBackground'
  | 'HoveredElementBackground'
  | 'FocusedElementBackground'
  | 'Border'
  | 'FocusedBorder'
  | 'HoveredBorder'
  | 'SolidBackground'
  | 'HoveredSolidBackground'
  | 'LowContrastText'
  | 'HighContrastText';

const colorStepToUseCaseMapping: Record<ColorSteps, ColorUseCases> = {
  '1': 'Background',
  '2': 'SubtleBackground',
  '3': 'ElementBackground',
  '4': 'HoveredElementBackground',
  '5': 'FocusedElementBackground',
  '6': 'Border',
  '7': 'FocusedBorder',
  '8': 'HoveredBorder',
  '9': 'SolidBackground',
  '10': 'HoveredSolidBackground',
  '11': 'LowContrastText',
  '12': 'HighContrastText',
};

function createSemanticColorPalette<T extends string>(
  paletteName: T,
  colors: Record<`${string}${ColorSteps}`, string>,
) {
  const keys = Object.keys(
    colors,
  ) as unknown as Array<`${string}${ColorSteps}`>;

  const palette = keys.reduce((semanticPalette, currentKey) => {
    const [step] = currentKey.match(/\d+/) ?? [];
    if (!step) {
      throw new Error(
        `Error getting step from ${currentKey}, building ${semanticPalette} palette`,
      );
    }
    semanticPalette[
      `${paletteName}${colorStepToUseCaseMapping[step as ColorSteps]}`
    ] = colors[currentKey];
    return semanticPalette;
  }, {} as Record<`${T}${ColorUseCases}`, string>);

  return palette;
}

const colors = {
  ...createSemanticColorPalette('primary', rawColors.crimson),
  ...createSemanticColorPalette('success', rawColors.lime),
  ...createSemanticColorPalette('error', rawColors.tomato),
  ...createSemanticColorPalette('info', rawColors.sky),
  ...createSemanticColorPalette('warning', rawColors.orange),
  ...createSemanticColorPalette('grayscale', rawColors.gray),

  darkText: rawColors.mauve.mauve12,
  lowContrastDarkText: rawColors.mauve.mauve11,

  lightText: rawColors.mauveDark.mauve12,
  lowContrastLightText: rawColors.mauveDark.mauve11,
};

const theme = {
  rawColors,
  colors,
  space: {
    none: '0',
    '0x': spaceScale(0),
    '1x': spaceScale(1),
    '2x': spaceScale(2),
    '3x': spaceScale(3),
    '4x': spaceScale(4),
    '5x': spaceScale(5),
    '6x': spaceScale(6),
    '7x': spaceScale(7),
    '8x': spaceScale(8),

    '4px': '4px',
    '8px': '8px',
    '16px': '16px',
    '24px': '24px',
    '32px': '32px',
  },
  borderRadius: {
    '0x': borderRadiusScale(0),
    '1x': borderRadiusScale(1),
    '2x': borderRadiusScale(2),
    '3x': borderRadiusScale(3),
    '4x': borderRadiusScale(4),
    '5x': borderRadiusScale(5),
    full: '99999px',
  },
  fontFamily: {
    system:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    accent: '"Bebas Neue", cursive',
  },
  letterSpacing: {
    normal: 'normal',
    '1px': '1px',
    '2px': '2px',
  },
  fontSize: {
    '0x': fontSizeScale(0),
    '1x': fontSizeScale(1),
    '2x': fontSizeScale(2),
    '3x': fontSizeScale(3),
    '4x': fontSizeScale(4),
    '5x': fontSizeScale(5),
  },
  lineHeight: {
    '0x': lineHeightScale(0),
    '1x': lineHeightScale(1),
    '2x': lineHeightScale(2),
    '3x': lineHeightScale(3),
    '4x': lineHeightScale(4),
    '5x': lineHeightScale(5),
  },
} as const;

const vars = createGlobalTheme(':root', theme);

const responsiveStyles = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'flex', 'inline'],
    flexDirection: ['row', 'column'],
    flexWrap: ['wrap', 'nowrap'],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    justifyContent: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-between',
    ],
    gap: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    width: ['100vw'],
    height: ['100vh'],
    borderRadius: vars.borderRadius,
    fontFamily: vars.fontFamily,
    fontSize: vars.fontSize,
    lineHeight: vars.lineHeight,
    letterSpacing: vars.letterSpacing,
    textAlign: ['center'],
    borderWidth: ['1px'],
    borderStyle: ['solid'],
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    placeItems: ['alignItems', 'justifyContent'],
    typeSize: ['fontSize', 'lineHeight'],
  },
});

const colorStyles = defineProperties({
  properties: {
    background: {
      steamBackground: 'rgb(38, 39, 58)',
      ...theme.colors,
    },
    color: theme.colors,
    borderColor: theme.colors,
  },
});

export const atoms = createSprinkles(responsiveStyles, colorStyles);
