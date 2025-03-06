import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { deleteAccessToken } from '@/constants/token-access';
import baseTheme from '@/constants/base-theme';
import SettingItem from '@/components/SettingItem';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.background
          : baseTheme.dark.background,
      flex: 1,
      padding: 16,
    },
    heading: {
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 8,
    },
    listTile: {
      flexDirection: 'row',
      paddingVertical: 8,
      gap: 16,
      alignItems: 'center',
    },
    listTileText: {
      flex: 1,
      fontWeight: 700,
      fontSize: 16,
    },
    groupContainer: {
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.surface
          : baseTheme.dark.surface,
      borderRadius: 16,
      marginBottom: 32,
    },
  });

  async function handleSignOut() {
    await deleteAccessToken();
    router.dismissAll();
    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Account</Text>

      <View style={styles.groupContainer}>
        <SettingItem
          iconName="email"
          title="Change Email"
          onPress={() => router.push('/settings/email')}
        />
        <SettingItem
          iconName="password"
          title="Change Password"
          onPress={() => router.push('/settings/password')}
        />
        <SettingItem
          iconName="logout"
          title="Sign Out"
          onPress={handleSignOut}
        />
        <SettingItem
          iconName="delete"
          title="Delete Account"
          onPress={() => router.push('/settings/delete')}
        />
      </View>
    </View>
  );
}
