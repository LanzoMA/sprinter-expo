import { TextInput } from 'react-native';
import { useTheme } from '@rneui/themed';

interface SprinterTextInputProps {
  placeholder?: string;
}

export default function SprinterTextInput({
  placeholder,
}: SprinterTextInputProps) {
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
      placeholder={placeholder}
    />
  );
}
