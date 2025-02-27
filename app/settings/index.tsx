import { StyleSheet, View } from 'react-native';
import {
  Text,
  useTheme,
  useThemeMode,
  Switch,
  Icon,
  ListItem,
} from '@rneui/themed';
import { router } from 'expo-router';
import { deleteAccessToken } from '@/constants/token-access';

export default function SettingsScreen() {
  const { theme } = useTheme();
  const { mode, setMode } = useThemeMode();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        padding: 16,
      }}
    >
      <Text style={styles.heading}>Account</Text>

      <View
        style={{
          backgroundColor: theme.colors.surface,

          borderRadius: 16,
          marginBottom: 32,
        }}
      >
        <ListItem
          containerStyle={{ backgroundColor: 'transparent' }}
          onPress={() => {
            router.push('/settings/email');
          }}
        >
          <Icon name="email" type="material" size={32} />
          <ListItem.Content>
            <ListItem.Title>Change Email</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron size={32} />
        </ListItem>

        <ListItem
          containerStyle={{ backgroundColor: 'transparent' }}
          onPress={() => {
            router.push('/settings/password');
          }}
        >
          <Icon name="password" type="material" size={32} />
          <ListItem.Content>
            <ListItem.Title>Change Password</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron size={32} />
        </ListItem>

        <ListItem
          containerStyle={{ backgroundColor: 'transparent' }}
          onPress={async () => {
            await deleteAccessToken();
            router.dismissAll();
            router.replace('/');
          }}
        >
          <Icon name="logout" type="material" size={32} />
          <ListItem.Content>
            <ListItem.Title>Sign Out</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron size={32} />
        </ListItem>

        <ListItem containerStyle={{ backgroundColor: 'transparent' }}>
          <Icon name="delete" type="material" size={32} />
          <ListItem.Content>
            <ListItem.Title>Delete Account</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron size={32} />
        </ListItem>
      </View>

      <Text style={styles.heading}>App</Text>

      <View
        style={{
          backgroundColor: theme.colors.surface,
          padding: 12,
          borderRadius: 16,
        }}
      >
        <View style={styles.listTile}>
          <Text style={styles.listTileText}>Dark Mode</Text>

          <Switch
            value={mode === 'dark'}
            onValueChange={(value) => {
              value ? setMode('dark') : setMode('light');
            }}
          />
        </View>
        <View style={styles.listTile}>
          <Text style={styles.listTileText}>Timer</Text>
          <Switch />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
