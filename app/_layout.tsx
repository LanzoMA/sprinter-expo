import { createTheme, ThemeProvider } from "@rneui/themed";
import { Stack } from "expo-router";

const theme = createTheme({
  darkColors: {
    primary: '#20cfa5',
    background: '#130e0e',
    grey0: '#2a2c30'
  },
  mode: 'dark',
});

const App = () => {
  return <ThemeProvider theme={theme}>
    <RootNavigation />
  </ThemeProvider>
}

export function RootNavigation() {
  return <Stack
    screenOptions={{ headerShown: false, statusBarBackgroundColor: 'black', }}
  />
}

export default App;