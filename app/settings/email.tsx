import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import SprinterTextInput from '@/components/SprinterTextInput';
import SprinterButton from '@/components/SprinterButton';
import baseTheme from '@/constants/base-theme';
import { getAccessToken, storeAccessToken } from '@/constants/token-access';
import { baseUrl } from '@/constants/base-url';
import Spinner from '@/components/Spinner';

export default function ChangeEmailScreen() {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

  const emailRegex = /^.+@.+\.\w+$/;

  async function submit() {
    if (email === '') return;

    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Invalid email given',
      });
      return;
    }

    setLoading(true);

    const accessToken = await getAccessToken();

    if (!accessToken) return;

    try {
      const response = await fetch(`${baseUrl}/account/email`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 400) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: data.error,
        });
        setLoading(false);

        return;
      }

      await storeAccessToken(data.accessToken);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Successfully updated email',
      });
      setEmail('');
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Email</Text>

      <SprinterTextInput
        inputMode="email"
        placeholder="New Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <SprinterButton title="Change Email" onPress={submit} />

      {loading && <Spinner />}
    </View>
  );
}
