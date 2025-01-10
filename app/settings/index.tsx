import { StyleSheet, View } from "react-native";
import { Text, useTheme, useThemeMode, Switch, Icon } from '@rneui/themed';

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
          backgroundColor: theme.colors.grey0,
          padding: 12,
          borderRadius: 16,
          marginBottom: 32,
        }}
      >
        <View style={styles.listTile}>
          <Icon
            name="email"
            type="material"
            size={32}
          />
          <Text style={styles.listTileText}>Change Email</Text>
          <Icon
            name="arrow-forward-ios"
            type="material"
          />
        </View>
        <View style={styles.listTile}>
          <Icon
            name="password"
            type="material"
            size={32}
          />
          <Text style={styles.listTileText}>Change Password</Text>
          <Icon
            name="arrow-forward-ios"
            type="material"
          />
        </View>
        <View style={styles.listTile}>
          <Icon
            name="logout"
            type="material"
            size={32}
          />
          <Text style={styles.listTileText}>Sign Out</Text>
          <Icon
            name="arrow-forward-ios"
            type="material"
          />
        </View>
        <View style={styles.listTile}>
          <Icon
            name="delete"
            type="material"
            size={32}
          />
          <Text style={styles.listTileText}>Delete Account</Text>
          <Icon
            name="arrow-forward-ios"
            type="material"
          />
        </View>
      </View>

      <Text style={styles.heading}>App</Text>

      <View style={{
        backgroundColor: theme.colors.grey0,
        padding: 12,
        borderRadius: 16,
      }}>
        <View style={styles.listTile}>
          <Text style={styles.listTileText}>Dark Mode</Text>

          <Switch
            value={mode === 'dark'}
            onValueChange={(value) => { value ? setMode('dark') : setMode('light'); }}
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
  }
});