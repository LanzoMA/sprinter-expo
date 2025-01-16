import { useTheme, Text, Button, Input } from "@rneui/themed";
import { Link, router } from "expo-router";
import { View } from "react-native";
import { useState } from 'react';
import { baseUrl } from "@/constants/base-url";
import { storeAccessToken } from "@/constants/token-access";

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
  // Check if username is 3 or more characters and only contains letters, numbers, underscores and underscores
  const usernameRegex = /^[\w\d\._]{3,}$/;
  // Check if the password is greater than 8 characters, contains a special character and a number
  const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>_ ])(?=.*\d).{8,}$/;

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
        'Password insecure: password must be 8 or more characters' +
        ' and contain numbers and special characters.'
      );
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      setLoading(false);
      return;
    }

    const response = await fetch(
      `${baseUrl}/register/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (response.status !== 201) {
      setEmailError('Email/username already taken');
      setLoading(false);
      return;
    }

    const json = await response.json();

    const accessToken = json.accessToken;

    if (!accessToken) {
      setEmailError('Something went wrong: access token not found');
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
      <Text style={{
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 700,
      }}>Sign Up</Text>

      <Input
        autoCapitalize="none"
        inputMode="email"
        placeholder="Email"
        onChangeText={(email) => {
          setEmail(email.trim());
          setEmailError('');
        }}
        errorMessage={emailError}
      />

      <Input
        autoCapitalize="none"
        placeholder="Username"
        onChangeText={(username) => {
          setUsername(username.trim());
          setUsernameError('');
        }}
        errorMessage={usernameError}
      />

      <Input
        autoCapitalize="none"
        secureTextEntry
        placeholder="Password"
        onChangeText={(password) => {
          setPassword(password.trim());
          setPasswordError('');
        }}
        errorMessage={passwordError}
      />

      <Input
        autoCapitalize="none"
        secureTextEntry
        placeholder="Confirm Password"
        onChangeText={(confirmPassword) => {
          setConfirmPassword(confirmPassword.trim());
          setConfirmPasswordError('');
        }}
        errorMessage={confirmPasswordError}
      />

      <Button
        title={loading ? '...' : 'SIGN UP'}
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