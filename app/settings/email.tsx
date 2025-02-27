import { View } from 'react-native';
import { Text, useTheme } from '@rneui/themed';
import SprinterTextInput from '@/components/SprinterTextInput';
import SprinterButton from '@/components/SprinterButton';

export default function ChangeEmailScreen() {
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
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Change Email</Text>
      <SprinterTextInput placeholder="New Email" />
      <SprinterButton title="Change Email" />
    </View>
  );
}
