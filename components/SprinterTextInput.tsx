import { TextInput, TextInputProps, View } from 'react-native';
import { useTheme, Text } from '@rneui/themed';

interface SprinterTextInputProps extends TextInputProps {
  errorMessage?: string;
}

export default function SprinterTextInput(props: SprinterTextInputProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: 4 }}>
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
      {props.errorMessage && (
        <Text style={{ fontSize: 12, color: theme.colors.error }}>
          {props.errorMessage}
        </Text>
      )}
    </View>
  );
}
