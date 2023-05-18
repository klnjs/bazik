import { style } from '@vanilla-extract/css';

import { vars } from '../theme/contract.css';
import { helpers } from '../theme/helpers.css';

export const textfieldBaseRoot = style({
  display: 'flex',
  alignItems: 'center',
  height: 58,
  overflow: 'hidden',
  outline: '1px solid transparent',
  outlineOffset: -1,
  borderRadius: helpers.radius(3),
  color: vars.palette.surface.secondary.contrast,
  background: vars.palette.surface.secondary.main,
  transition: helpers.transition('border-color', 'box-shadow'),
  boxShadow: `0 0 0 0 ${vars.palette.indicator.accent.alpha50}`,
  ':focus-within': {
    color: vars.palette.background.secondary.contrast,
    background: vars.palette.background.secondary.main,
    outlineColor: vars.palette.indicator.accent.main,
    boxShadow: `0 0 0 4px ${vars.palette.indicator.accent.alpha50}`,
  },
  selectors: {
    '&.disabled': {
      background: 'transparent',
      outlineColor: vars.palette.surface.secondary.main,
    },
    '&.invalid': {
      background: vars.palette.background.secondary.main,
      outlineColor: vars.palette.indicator.negative.main,
      boxShadow: `0 0 0 4px ${vars.palette.indicator.negative.alpha50}`,
    },
  },
});

export const textfieldBaseInput = style({
  width: '100%',
  height: '100%',
  border: 0,
  margin: 0,
  padding: helpers.spacing(0, 2),
  outline: 0,
  fontSize: 14,
  fontWeight: vars.font.weight.normal,
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  background: 'transparent',
  backgroundClip: 'text',
  '::placeholder': {
    opacity: 1,
    color: vars.palette.surface.quaternary.main,
  },
});
