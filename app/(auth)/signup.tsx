import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { baseUrl } from '@/constants/base-url';
import { storeAccessToken } from '@/constants/token-access';
import SprinterButton from '@/components/SprinterButton';
import SprinterTextInput from '@/components/SprinterTextInput';
import Spinner from '@/components/Spinner';
import baseTheme from '@/constants/base-theme';

export default function SignUpScreen() {
  const colorScheme = useColorScheme();

  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // Check if email contains @ and .
  const emailRegex = /^.+@.+\.\w+$/;
  // Check if username is 3 or more characters and only contains letters and numbers
  const usernameRegex = /^[\w\d\.]{3,}$/;
  // Check if the password is greater than 8 characters and contains a number
  const passwordRegex = /^(?=.*\d).{8,}$/;

  const styles = StyleSheet.create({
    container: {
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.background
          : baseTheme.dark.background,
      flex: 1,
      padding: 16,
      justifyContent: 'center',
      gap: 32,
    },
    title: {
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 700,
    },
    text: {
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
    },
    footer: {
      flexDirection: 'row',
      gap: 4,
      justifyContent: 'center',
    },
    link: {
      color: baseTheme.common.primary,
      fontWeight: 700,
    },
  });

  async function signup() {
    setLoading(true);

    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Enter a valid email address',
      });
      setLoading(false);
      return;
    }

    if (!usernameRegex.test(username)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Username',
        text2: 'Enter a valid username',
      });
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Password',
        text2: 'Password must be 8 or more characters and contain numbers.',
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match',
      });
      setLoading(false);
      return;
    }

    const response = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (response.status === 400) {
      const data = await response.json();

      Toast.show({
        type: 'error',
        text1: 'Account Creation Failed',
        text2: data.error,
      });

      setLoading(false);

      return;
    }

    if (response.status !== 201) {
      Toast.show({
        type: 'error',
        text1: 'Account Creation Failed',
        text2: 'Something went wrong. Please try again later.',
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

    router.replace('/course-selection');

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <SprinterTextInput
        autoCapitalize="none"
        inputMode="email"
        placeholder="Email"
        onChangeText={(email) => setEmail(email.trim())}
      />

      <SprinterTextInput
        autoCapitalize="none"
        placeholder="Username"
        onChangeText={(username) => setUsername(username.trim())}
      />

      <SprinterTextInput
        autoCapitalize="none"
        secureTextEntry
        placeholder="Password"
        onChangeText={(password) => setPassword(password.trim())}
      />

      <SprinterTextInput
        autoCapitalize="none"
        secureTextEntry
        placeholder="Confirm Password"
        onChangeText={(confirmPassword) =>
          setConfirmPassword(confirmPassword.trim())
        }
      />

      <SprinterButton title="SIGN UP" onPress={signup} />

      {loading && <Spinner />}

      <View style={styles.footer}>
        <Text style={styles.text}>Already have an account?</Text>
        <Link replace style={styles.link} href="/login">
          Login
        </Link>
      </View>
    </View>
  );
}
