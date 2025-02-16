import theme from '@/constants/theme';
import { ThemeProvider } from '@rneui/themed';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <RootNavigation />
        </GestureHandlerRootView>
      </SafeAreaProvider>
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
