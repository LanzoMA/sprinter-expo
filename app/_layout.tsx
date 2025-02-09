import { createTheme, ThemeProvider } from '@rneui/themed';
import { Stack } from 'expo-router';

const theme = createTheme({
  lightColors: {
    primary: '#20cfa5',
    background: '#fff',
    surface: '#e0e0e0',
    surfaceBright: '#3B3F46',
    surfaceTransparent: '#3B3F46cc',
    text: '#000',
    red: '#D81F1F',
    orange: '#E87B16',
    yellow: '#FDE82B',
    green: '#2FCA22',
    blue: '#18A8D6',
  },
  darkColors: {
    primary: '#20cfa5',
    background: '#0f0f0f',
    surface: '#2a2c30',
    surfaceBright: '#3B3F46',
    surfaceTransparent: '#3B3F46cc',
    text: '#fff',
    red: '#D81F1F',
    orange: '#E87B16',
    yellow: '#FDE82B',
    green: '#2FCA22',
    blue: '#18A8D6',
  },
  mode: 'dark',
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RootNavigation />
    </ThemeProvider>
  );
};

export function RootNavigation() {
  return (
    <Stack
      screenOptions={{ headerShown: false, statusBarBackgroundColor: 'black' }}
    />
  );
}

export default App;
