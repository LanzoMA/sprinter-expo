import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@rneui/themed';

interface SprinterButtonProps {
  title: string;
  onPress?: () => void;
}

export default function SprinterButton({
  title,
  onPress,
}: SprinterButtonProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.colors.primary,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
      }}
      onPress={onPress}
    >
      <Text style={{ color: theme.colors.text, fontWeight: 700, fontSize: 20 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
