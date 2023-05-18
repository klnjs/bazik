import { style } from '@vanilla-extract/css';

export const buttonBaseRoot = style({
  font: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
  border: 0,
  margin: 0,
  padding: 0,
  outline: 0,
  borderRadius: 0,
  flexShrink: 0,
  position: 'relative',
  appearance: 'none',
  userSelect: 'none',
  textDecoration: 'none',
  background: 'transparent',
  WebkitTapHighlightColor: 'transparent',
  ':disabled': {
    cursor: 'default',
    pointerEvents: 'none',
  },
});
