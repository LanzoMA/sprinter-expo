import { Link, router } from "expo-router";
import { View, TextInput } from "react-native";
import { Text, useTheme, Button } from '@rneui/themed';
import { useEffect, useState } from "react";
import { Snackbar } from 'react-native-paper';
import { baseUrl } from "@/constants/base-url";
import { storeAccessToken } from "@/constants/token-access";

export default function LoginScreen() {
  const { theme } = useTheme();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    message !== '' ? setVisible(true) : setVisible(false);
  }, [message])

  async function login() {
    setLoading(true);

    if (email === '') {
      setMessage('Email is not provided');
      setLoading(false);
      return;
    }

    if (password === '') {
      setMessage('Password is not provided');
      setLoading(false);
      return;
    }

    const response = await fetch(
      `${baseUrl}/login/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status !== 200) {
      setMessage('Incorrect email/password');
      setLoading(false);
      return;
    }

    const json = await response.json();

    const accessToken = json.accessToken;

    if (!accessToken) {
      setMessage('Something went wrong: access token not found');
      setLoading(false);
      return;
    }

    await storeAccessToken(accessToken);

    router.replace('/');
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
      <Text style={{
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 700,
      }}
      >Login</Text>

      <TextInput
        style={{ color: theme.colors.white }}
        autoCapitalize='none'
        inputMode="email"
        placeholder="Email"
        placeholderTextColor='gray'
        onChangeText={(email) => { setEmail(email.trim()) }}
      />

      <TextInput
        style={{ color: theme.colors.white }}
        autoCapitalize="none"
        secureTextEntry
        placeholder="Password"
        placeholderTextColor='gray'
        onChangeText={(password) => { setPassword(password.trim()) }}
      />

      <Button
        title={loading ? '...' : 'LOGIN'}
        titleStyle={{ fontWeight: 700 }}
        onPress={login}
      />

      <View
        style={{
          flexDirection: 'row',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        <Text>No account?</Text>
        <Link
          href='/signup'
          style={{
            color: theme.colors.primary,
            fontWeight: 700
          }}
        >
          Sign Up
        </Link>
      </View>

      <Snackbar
        visible={visible}
        onDismiss={() => { setVisible(false) }}
      >
        <Text>{message}</Text>
      </Snackbar>
    </View>
  )
}