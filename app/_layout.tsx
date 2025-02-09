import { createTheme, ThemeProvider } from '@rneui/themed';
import { Stack } from 'expo-router';

const theme = createTheme({
  lightColors: {
    primary: '#20cfa5',
    background: '#fff',
    surface: '#e0e0e0',
    surfaceBright: '#3B3F46',
    text: '#000',
    yellow: '#FDE82B',
  },
  darkColors: {
    primary: '#20cfa5',
    background: '#0f0f0f',
    surface: '#2a2c30',
    surfaceBright: '#3B3F46',
    text: '#fff',
    yellow: '#FDE82B',
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
