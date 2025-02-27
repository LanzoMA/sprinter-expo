import { View } from 'react-native';
import { useTheme, Text } from '@rneui/themed';
import SprinterTextInput from '@/components/SprinterTextInput';
import SprinterButton from '@/components/SprinterButton';

export default function DeleteAccountScreen() {
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
      <Text>Delete Account</Text>

      <View style={{ gap: 16 }}>
        <SprinterTextInput placeholder="Email" />
        <SprinterTextInput secureTextEntry placeholder="Password" />
      </View>

      <SprinterButton title="Delete Account" />
    </View>
  );
}
