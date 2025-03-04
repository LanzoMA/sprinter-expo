import {
  View,
  Text,
  TextInput,
  TextInputProps,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import baseTheme from '@/constants/base-theme';

interface SprinterTextInputProps extends TextInputProps {
  errorMessage?: string;
  label?: string;
}

export default function SprinterTextInput(props: SprinterTextInputProps) {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      gap: 4,
      width: '100%',
    },
    textInput: {
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.surface
          : baseTheme.dark.surface,
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
      borderRadius: 8,
      padding: 16,
    },
    error: {
      fontSize: 12,
      color: baseTheme.common.error,
    },
    text: {
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
    },
  });

  return (
    <View style={styles.container}>
      {props.label && <Text style={styles.text}>{props.label}</Text>}
      <TextInput
        style={styles.textInput}
        cursorColor={baseTheme.common.primary}
        placeholderTextColor={
          colorScheme === 'light'
            ? baseTheme.light.subtleText
            : baseTheme.dark.subtleText
        }
        {...props}
      />
      {props.errorMessage && (
        <Text style={styles.error}>{props.errorMessage}</Text>
      )}
    </View>
  );
}
