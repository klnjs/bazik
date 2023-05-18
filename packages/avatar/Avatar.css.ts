import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../theme/contract.css';
import { helpers } from '../theme/helpers.css';

export const avatarRoot = style({
  display: 'flex',
  overflow: 'clip',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  boxSizing: 'border-box',
});

export const avatarSizes = styleVariants(
  { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 },
  (size) => ({
    width: helpers.spacing(size + 4),
    height: helpers.spacing(size + 4),
  })
);

export const avatarVariants = styleVariants(vars.palette.surface, (color) => ({
  color: color.contrast,
  backgroundColor: color.main,
}));

export const avatarImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});
