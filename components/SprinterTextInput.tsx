import { TextInput, TextInputProps, useColorScheme, View } from 'react-native';
import { useTheme, Text } from '@rneui/themed';
import baseTheme from '@/constants/base-theme';

interface SprinterTextInputProps extends TextInputProps {
  errorMessage?: string;
  label?: string;
}

export default function SprinterTextInput(props: SprinterTextInputProps) {
  const { theme } = useTheme();
  const colorScheme = useColorScheme();

  return (
    <View style={{ gap: 4, width: '100%' }}>
      {props.label && <Text>{props.label}</Text>}
      <TextInput
        style={{
          backgroundColor: theme.colors.surface,
          color: theme.colors.text,
          borderRadius: 8,
          padding: 16,
        }}
        cursorColor={theme.colors.primary}
        placeholderTextColor={
          colorScheme === 'light'
            ? baseTheme.light.subtleText
            : baseTheme.dark.subtleText
        }
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
