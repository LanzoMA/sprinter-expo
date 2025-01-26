import { Pressable, View } from 'react-native';
import { Text, useTheme } from '@rneui/themed';

interface ChipProps {
  title: string;
  onPress?: () => void;
}

const Chip = (props: ChipProps) => {
  const { theme } = useTheme();

  return (
    <Pressable onPress={props.onPress}>
      <View
        style={{
          backgroundColor: theme.colors.grey1,
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
