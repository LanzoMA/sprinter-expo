import { useTheme, Text } from '@rneui/themed';
import { View } from 'react-native';

export default function SearchScreen() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <Text style={{ textAlign: 'center' }}>Nothing to search.</Text>
    </View>
  )
}