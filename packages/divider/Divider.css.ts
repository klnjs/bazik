import { style } from '@vanilla-extract/css';

import { vars } from '../theme/contract.css';
import { helpers } from '../theme/helpers.css';

export const dividerRoot = style({
  position: 'relative',
  color: vars.palette.surface.secondary.main,
  width: '100%',
});

export const dividerRule = style({
  height: 1,
  border: 0,
  margin: 0,
  padding: 0,
  backgroundColor: vars.palette.surface.secondary.main,
});

export const dividerText = style({
  display: 'block',
  position: 'absolute',
  padding: helpers.spacing(0, 2),
  transform: 'translate(-50%, -50%)',
  background: vars.palette.static.white,
  top: '50%',
  left: '50%',
});
