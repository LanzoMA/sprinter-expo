import { useTheme, Text } from '@rneui/themed';
import { Image } from 'expo-image';
import { Dimensions, View } from 'react-native';

interface PostProps {
  image: string;
  title: string;
  marks: number;
}

const Post = (props: PostProps) => {
  const { theme } = useTheme();
  const { width } = Dimensions.get('window');

  const title =
    props.title.length > 28 ? props.title.slice(0, 16) + '...' : props.title;

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        padding: 4,
        borderRadius: 4,
        gap: 4,
        width: width / 2 - 16,
        height: 160,
        margin: 4,
      }}
    >
      <View style={{ backgroundColor: 'white', borderRadius: 4, flex: 1 }}>
        <Image
          style={{ flex: 1 }}
          source={{ uri: props.image }}
          contentFit="contain"
        />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 700, flex: 1 }}>{title}</Text>
        <Text>{props.marks}</Text>
      </View>
    </View>
  );
};

export default Post;
