import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import { useState } from 'react';
import SprinterTextInput from '@/components/SprinterTextInput';
import SprinterButton from '@/components/SprinterButton';
import baseTheme from '@/constants/base-theme';
import Toast from 'react-native-toast-message';
import { getAccessToken } from '@/constants/token-access';
import { baseUrl } from '@/constants/base-url';
import Spinner from '@/components/Spinner';

export default function ChangePasswordScreen() {
  const colorScheme = useColorScheme();

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const passwordRegex = /^(?=.*\d).{8,}$/;

  const styles = StyleSheet.create({
    container: {
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.background
          : baseTheme.dark.background,
      flex: 1,
      padding: 16,
      gap: 32,
    },
    title: {
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
      fontWeight: 700,
      fontSize: 20,
    },
    fields: { gap: 16 },
  });

  async function submit() {
    if (password === '' || confirmPassword === '') return;

    if (!passwordRegex.test(password)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          'Password insecure. Passwords must be more than 8 characters and contain numbers.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Passwords do not match',
      });
      return;
    }

    setLoading(true);

    const accessToken = await getAccessToken();

    if (!accessToken) return;

    try {
      await fetch(`${baseUrl}/account/password`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ password }),
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Successfully updated password',
      });
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong',
      });
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <View style={styles.fields}>
        <SprinterTextInput
          secureTextEntry
          placeholder="New Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <SprinterTextInput
          secureTextEntry
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>

      <SprinterButton title="Reset Password" onPress={submit} />

      {loading && <Spinner />}
    </View>
  );
}
