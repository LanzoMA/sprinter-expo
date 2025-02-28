import { createTheme } from '@rneui/themed';

const commonColors = {
  red: '#D81F1F',
  orange: '#E87B16',
  yellow: '#FDE82B',
  green: '#2FCA22',
  blue: '#18A8D6',
};

const theme = createTheme({
  lightColors: {
    primary: '#20cfa5',
    background: '#fff',
    surface: '#e0e0e0',
    surfaceBright: '#3B3F46',
    surfaceDark: '#1A1A1C',
    surfaceTransparent: '#3B3F46cc',
    text: '#000',
    ...commonColors,
  },
  darkColors: {
    primary: '#20cfa5',
    background: '#0f0f0f',
    surface: '#2a2c30',
    surfaceBright: '#3B3F46',
    surfaceDark: '#1A1A1C',
    surfaceTransparent: '#3B3F46cc',
    text: '#fff',
    ...commonColors,
  },
  mode: 'dark',
});

export default theme;
