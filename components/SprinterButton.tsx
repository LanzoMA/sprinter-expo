import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import baseTheme from '@/constants/base-theme';

interface SprinterButtonProps {
  title: string;
  onPress?: () => void;
}

export default function SprinterButton({
  title,
  onPress,
}: SprinterButtonProps) {
  const styles = StyleSheet.create({
    background: {
      backgroundColor: baseTheme.common.primary,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      padding: 8,
    },
    text: {
      color: baseTheme.dark.text,
      fontWeight: 700,
      fontSize: 20,
    },
  });

  return (
    <TouchableOpacity style={styles.background} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
