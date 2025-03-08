import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import baseTheme from '@/constants/base-theme';

interface EditCoursesButtonProps {
  onPress: () => void;
}

export default function EditCoursesButton({ onPress }: EditCoursesButtonProps) {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.surface
          : baseTheme.dark.surface,
      padding: 8,
      borderRadius: 8,
    },
    text: {
      color:
        colorScheme === 'light'
          ? baseTheme.light.subtleText
          : baseTheme.dark.text,
      fontSize: 16,
      fontWeight: 700,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>Edit</Text>
    </TouchableOpacity>
  );
}
