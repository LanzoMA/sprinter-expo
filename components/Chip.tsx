import { Pressable, View } from 'react-native';
import { Text, useTheme } from '@rneui/themed';

interface ChipProps {
  title: string;
  color?: string;
  onPress?: () => void;
}

const Chip = (props: ChipProps) => {
  const { theme } = useTheme();

  const chipColor = props.color ?? theme.colors.surfaceBright;

  return (
    <Pressable onPress={props.onPress}>
      <View
        style={{
          backgroundColor: chipColor,
          paddingVertical: 4,
          paddingHorizontal: 8,
          borderRadius: 4,
        }}
      >
        <Text>{props.title}</Text>
      </View>
    </Pressable>
  );
};

export default Chip;
