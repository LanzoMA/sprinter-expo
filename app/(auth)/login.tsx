import { View, Text } from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { baseUrl } from '@/constants/base-url';
import { storeAccessToken } from '@/constants/token-access';
import SprinterButton from '@/components/SprinterButton';
import SprinterTextInput from '@/components/SprinterTextInput';
import baseTheme from '@/constants/base-theme';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  async function login() {
    setLoading(true);

    if (email === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No email provided',
      });
      setLoading(false);
      return;
    }

    if (password === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No password provided',
      });
      setLoading(false);
      return;
    }

    const response = await fetch(`${baseUrl}/auth/login/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status !== 200) {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: 'Incorrect email/password',
      });
      setLoading(false);
      return;
    }

    const json = await response.json();

    const accessToken = json.accessToken;

    if (!accessToken) {
      setLoading(false);
      return;
    }

    await storeAccessToken(accessToken);

    router.replace('/');
  }

  return (
    <View
      style={{
        backgroundColor: baseTheme.dark.background,
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        gap: 32,
      }}
    >
      <Text
        style={{
          color: baseTheme.dark.text,
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        Login To Sprinter
      </Text>

      <SprinterTextInput
        autoCapitalize="none"
        inputMode="email"
        placeholder="Email"
        onChangeText={(email) => {
          setEmail(email.trim());
        }}
      />

      <SprinterTextInput
        autoCapitalize="none"
        secureTextEntry
        placeholder="Password"
        onChangeText={(password) => {
          setPassword(password.trim());
        }}
      />

      <SprinterButton title={loading ? '...' : 'LOGIN'} onPress={login} />

      <View
        style={{
          flexDirection: 'row',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: baseTheme.dark.text }}>No account?</Text>
        <Link
          href="/signup"
          style={{
            color: baseTheme.common.primary,
            fontWeight: 700,
          }}
        >
          Sign Up
        </Link>
      </View>
    </View>
  );
}
