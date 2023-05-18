import { style } from '@vanilla-extract/css';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { vars } from '../theme/contract.css';
import { helpers } from '../theme/helpers.css';

export const iconRoot = style({
  display: 'block',
  fill: 'currentColor',
  transition: helpers.transition('fill', 'transform'),
  pointerEvents: 'none',
  width: '1em',
  height: '1em',
  flexShrink: 0,
  userSelect: 'none',
});

export const iconSprinkles = createSprinkles(
  defineProperties({
    properties: {
      color: {
        primary: vars.palette.text.primary,
        secondary: vars.palette.text.secondary,
        tertiary: vars.palette.surface.tertiary.main,
        quaternary: vars.palette.surface.quaternary.main,
        accent: vars.palette.indicator.accent.main,
        positive: vars.palette.indicator.positive.main,
        negative: vars.palette.indicator.negative.main,
        attention: vars.palette.indicator.attention.main,
      },
      height: vars.spacing,
      width: vars.spacing,
      transform: {
        0: `rotate(0)`,
        90: `rotate(90deg)`,
        180: `rotate(180deg)`,
        270: `rotate(270deg)`,
        360: `rotate(360deg)`,
      },
    } as const,
  })
);
