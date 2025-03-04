import { useTheme, Text } from '@rneui/themed';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Dimensions, Pressable, View } from 'react-native';

interface PostProps {
  id: string;
  image: string;
  title: string;
  marks: number;
  onPress: () => void;
}

const Post = (props: PostProps) => {
  const { theme } = useTheme();
  const { width } = Dimensions.get('window');

  const title =
    props.title.length > 22 ? props.title.slice(0, 19) + '...' : props.title;

  return (
    <Pressable onPress={props.onPress}>
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
    </Pressable>
  );
};

export default Post;
