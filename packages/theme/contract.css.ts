import { createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
  font: {
    family: 'Arial',
    size: {
      1: '10px',
      2: '12px',
      3: '14px',
      4: '16px',
      5: '18px',
      6: '20px',
      7: '26px',
      8: '36px',
    },
    weight: {
      normal: '400',
      medium: '500',
    },
  },
  radius: {
    1: '4px',
    2: '8px',
  },
  spacing: {
    0: '0',
    0.5: '4px',
    1: '8px',
    2: '16px',
    3: '24px',
    4: '32px',
    5: '40px',
    6: '48px',
    7: '56px',
  },
  palette: {
    text: {
      primary: '#000000',
      secondary: '#6C6C70',
    },
    static: {
      white: '#FFFFFF',
      black: '#000000',
    },
    surface: {
      primary: { main: '#000000', contrast: '#FFFFFF' },
      secondary: { main: '#E4E4E4', contrast: '#000000' },
      tertiary: { main: '#D6D6D6', contrast: '#000000' },
      quaternary: { main: '#B2B2B2', contrast: '#000000' },
    },
    indicator: {
      accent: { main: '#9AAFF5', contrast: '#000000', alpha50: '#D9E0F7' },
      positive: { main: '#00CB39', contrast: '#000000', alpha50: '#00CB3980' },
      negative: { main: '#FF1A1A', contrast: '#000000', alpha50: '#F9C3C3' },
      attention: { main: '#FFD24C', contrast: '#000000', alpha50: '#FFD24C80' },
    },
    background: {
      primary: { main: '#F7F7F7', contrast: '#000000' },
      secondary: { main: '#FFFFFF', contrast: '#717175' },
    },
  },
  transition: {
    easing: 'ease',
    duration: '400ms',
  },
});
