import { style } from '@vanilla-extract/css';

import { vars } from '../theme/contract.css';
import { helpers } from '../theme/helpers.css';

export const radioBaseRoot = style({
  position: 'relative',
  borderRadius: '50%',
  width: 24,
  height: 24,
});

export const radioBaseInput = style({
  position: 'absolute',
  boxSizing: 'border-box',
  inset: 0,
  margin: 0,
  padding: 0,
  outline: '1px solid transparent',
  outlineOffset: -1,
  background: vars.palette.surface.secondary.main,
  cursor: 'pointer',
  appearance: 'none',
  transition: helpers.transition('outline-color', 'box-shadow', 'background'),
  borderRadius: 'inherit',
  ':checked': {
    outlineColor: vars.palette.surface.primary.main,
    background: vars.palette.surface.primary.main,
  },
  ':disabled': {
    outlineColor: vars.palette.surface.secondary.main,
    background: 'transparent',
  },
  ':focus-visible': {
    outlineColor: vars.palette.indicator.accent.main,
    boxShadow: `0 0 0 4px ${vars.palette.indicator.accent.alpha50}`,
  },
  selectors: {
    '&.invalid': {
      outlineColor: vars.palette.indicator.negative.main,
      boxShadow: `0 0 0 4px ${vars.palette.indicator.negative.alpha50}`,
    },
  },
});

export const radioBaseCircle = style({
  inset: 8,
  borderRadius: 'inherit',
  position: 'absolute',
  pointerEvents: 'none',
  background: vars.palette.surface.primary.contrast,
  transform: 'scale(0)',
  transition: helpers.transition('transform'),
  selectors: {
    [`${radioBaseInput}:checked + &`]: {
      transform: 'scale(1)',
    },
    [`${radioBaseInput}:disabled + &`]: {
      background: vars.palette.surface.secondary.main,
    },
  },
});
