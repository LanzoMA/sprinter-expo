import { View } from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { useTheme, Text } from '@rneui/themed';
import Toast from 'react-native-toast-message';
import { baseUrl } from '@/constants/base-url';
import { storeAccessToken } from '@/constants/token-access';
import SprinterButton from '@/components/SprinterButton';
import SprinterTextInput from '@/components/SprinterTextInput';
import Spinner from '@/components/Spinner';

export default function SignUpScreen() {
  const { theme } = useTheme();

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  // Check if email contains @ and .
  const emailRegex = /^.+@.+\.\w+$/;
  // Check if username is 3 or more characters and only contains letters and numbers
  const usernameRegex = /^[\w\d\.]{3,}$/;
  // Check if the password is greater than 8 characters and contains a number
  const passwordRegex = /^(?=.*\d).{8,}$/;

  async function signup() {
    setLoading(true);

    if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email address');
      setLoading(false);
      return;
    }

    if (!usernameRegex.test(username)) {
      setUsernameError('Enter a valid username');
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Invalid password. Password must be 8 or more characters and contain numbers.'
      );
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
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

    router.replace('/');

    setLoading(false);
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
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        Sign Up
      </Text>

      <SprinterTextInput
        autoCapitalize="none"
        inputMode="email"
        placeholder="Email"
        onChangeText={(email) => {
          setEmail(email.trim());
          setEmailError('');
        }}
        errorMessage={emailError}
      />

      <SprinterTextInput
        autoCapitalize="none"
        placeholder="Username"
        onChangeText={(username) => {
          setUsername(username.trim());
          setUsernameError('');
        }}
        errorMessage={usernameError}
      />

      <SprinterTextInput
        autoCapitalize="none"
        secureTextEntry
        placeholder="Password"
        onChangeText={(password) => {
          setPassword(password.trim());
          setPasswordError('');
        }}
        errorMessage={passwordError}
      />

      <SprinterTextInput
        autoCapitalize="none"
        secureTextEntry
        placeholder="Confirm Password"
        onChangeText={(confirmPassword) => {
          setConfirmPassword(confirmPassword.trim());
          setConfirmPasswordError('');
        }}
        errorMessage={confirmPasswordError}
      />

      <SprinterButton title="SIGN UP" onPress={signup} />

      {loading && <Spinner />}

      <View
        style={{
          flexDirection: 'row',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        <Text>Already have an account?</Text>
        <Link replace style={{ color: theme.colors.primary }} href="/login">
          Login
        </Link>
      </View>
    </View>
  );
}
