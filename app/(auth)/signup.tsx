import { useTheme, Text, Button } from "@rneui/themed";
import { Link, router } from "expo-router";
import { View, TextInput } from "react-native";

export default function SignUpScreen() {
  const { theme } = useTheme();

  async function signup() {
    router.replace('/(auth)/login');
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
      <Text>Sign Up</Text>

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
        placeholder="Username"
        placeholderTextColor='white'
      />

      <TextInput
        style={{
          color: theme.colors.white,
        }}
        placeholder="Password"
        placeholderTextColor='white'
      />

      <TextInput
        style={{
          color: theme.colors.white,
        }}
        placeholder="Confirm Password"
        placeholderTextColor='white'
      />

      <Button
        title='SIGN UP'
        onPress={signup}
      />

      <View
        style={{
          flexDirection: 'row',
          gap: 4,
          justifyContent: 'center'
        }}
      >
        <Text>Already have an account?</Text>
        <Link replace style={{ color: theme.colors.primary }} href='/login' >Login</Link>
      </View>
    </View>
  )
}