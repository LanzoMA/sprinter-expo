import { TextInput } from 'react-native';
import { useTheme } from '@rneui/themed';

interface SprinterTextInputProps {
  placeholder?: string;
  secureTextEntry?: boolean;
}

export default function SprinterTextInput({
  placeholder,
  secureTextEntry,
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
      secureTextEntry={secureTextEntry}
    />
  );
}
