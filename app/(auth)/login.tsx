import { Link, router } from "expo-router";
import { View, TextInput } from "react-native";
import { Text, useTheme, Button } from '@rneui/themed';

export default function LoginScreen() {
  const { theme } = useTheme();

  async function login() {
    router.replace('/(tabs)/home');
  }

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        gap: 32,
      }}
    >
      <Text>Login</Text>

      <TextInput
        style={{
          color: theme.colors.white,
        }}
        placeholder="Email"
        placeholderTextColor='white'
      />
      <TextInput
        style={{
          color: theme.colors.white,
        }}
        placeholder="Password"
        placeholderTextColor='white'
      />

      <Button title='LOGIN' onPress={login} />

      <View
        style={{
          flexDirection: 'row',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        <Text >No account?</Text>
        <Link
          href='/signup'
          style={{ color: theme.colors.primary }}
        >
          Sign Up
        </Link>
      </View>
    </View>
  )
}