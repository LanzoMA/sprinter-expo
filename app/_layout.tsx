import { Stack } from 'expo-router';
import { ThemeProvider } from '@rneui/themed';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import theme from '@/constants/theme';
import toastConfig from '@/constants/toast-config';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <RootNavigation />
        </GestureHandlerRootView>
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export function RootNavigation() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarBackgroundColor: 'black',
      }}
    />
  );
}
