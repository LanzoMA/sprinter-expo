import {
  Pressable,
  useColorScheme,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import baseTheme from '@/constants/base-theme';

interface ChipProps {
  title: string;
  color?: string;
  onPress?: () => void;
}

export default function Chip({ title, color, onPress }: ChipProps) {
  const colorScheme = useColorScheme();

  const chipColor =
    color || colorScheme === 'light'
      ? baseTheme.light.surface
      : baseTheme.dark.surface;

  const styles = StyleSheet.create({
    background: {
      backgroundColor: chipColor,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 4,
    },
    text: {
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
    },
  });

  return (
    <Pressable onPress={onPress}>
      <View style={styles.background}>
        <Text>{title}</Text>
      </View>
    </Pressable>
  );
}
