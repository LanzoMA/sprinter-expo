import { createTheme, ThemeProvider } from '@rneui/themed';
import { Stack } from 'expo-router';

const theme = createTheme({
  lightColors: {
    primary: '#20cfa5',
    background: '#fff',
    grey0: '#e0e0e0',
    grey1: '#3B3F46',
    white: '#000',
  },
  darkColors: {
    primary: '#20cfa5',
    background: '#130e0e',
    grey0: '#2a2c30',
    grey1: '#3B3F46',
    white: '#fff',
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
