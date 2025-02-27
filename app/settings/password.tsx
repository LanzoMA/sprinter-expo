import { View } from 'react-native';
import { Text, useTheme } from '@rneui/themed';
import SprinterTextInput from '@/components/SprinterTextInput';
import SprinterButton from '@/components/SprinterButton';

export default function ChangePasswordScreen() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        padding: 16,
        gap: 32,
      }}
    >
      <Text style={{ fontWeight: 700, fontSize: 20 }}>Change Password</Text>

      <View style={{ gap: 16 }}>
        <SprinterTextInput secureTextEntry placeholder="Current Password" />
        <SprinterTextInput secureTextEntry placeholder="New Password" />
        <SprinterTextInput secureTextEntry placeholder="Confirm New Password" />
      </View>

      <SprinterButton title="Reset Password" />
    </View>
  );
}
