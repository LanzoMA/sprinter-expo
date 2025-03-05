import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import { useState } from 'react';
import SprinterTextInput from '@/components/SprinterTextInput';
import SprinterButton from '@/components/SprinterButton';
import baseTheme from '@/constants/base-theme';
import Spinner from '@/components/Spinner';
import { deleteAccessToken, getAccessToken } from '@/constants/token-access';
import Toast from 'react-native-toast-message';
import { baseUrl } from '@/constants/base-url';
import { router } from 'expo-router';

export default function DeleteAccountScreen() {
  const colorScheme = useColorScheme();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
    fields: { gap: 16 },
  });

  async function submit() {
    if (email === '' || password === '') return;

    setLoading(true);

    const accessToken = await getAccessToken();

    if (!accessToken) return;

    try {
      await fetch(`${baseUrl}/account`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Successfully deleted account',
      });

      await deleteAccessToken();

      router.dismissTo('/(auth)/login');
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
      <Text style={styles.title}>Delete Account</Text>

      <View style={styles.fields}>
        <SprinterTextInput
          inputMode="email"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <SprinterTextInput
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <SprinterButton title="Delete Account" onPress={submit} />

      {loading && <Spinner />}
    </View>
  );
}
