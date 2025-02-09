import theme from '@/constants/theme';
import { ThemeProvider } from '@rneui/themed';
import { Stack } from 'expo-router';

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
