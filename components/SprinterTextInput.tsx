import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from '@rneui/themed';

export default function SprinterTextInput(props: TextInputProps) {
  const { theme } = useTheme();

  return (
    <TextInput
      style={{
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
        borderRadius: 8,
        padding: 16,
      }}
      cursorColor={theme.colors.primary}
      placeholderTextColor={theme.colors.text}
      {...props}
    />
  );
}
