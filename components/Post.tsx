import {
  Dimensions,
  Pressable,
  View,
  useColorScheme,
  Text,
  StyleSheet,
} from 'react-native';
import { Image } from 'expo-image';
import baseTheme from '@/constants/base-theme';

interface PostProps {
  id: string;
  image: string;
  title: string;
  marks: number;
  onPress: () => void;
  onLongPress?: () => void;
}

const Post = (props: PostProps) => {
  const colorScheme = useColorScheme();
  const { width } = Dimensions.get('window');

  const title =
    props.title.length > 22 ? props.title.slice(0, 19) + '...' : props.title;

  const styles = StyleSheet.create({
    container: {
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.surface
          : baseTheme.dark.surface,
      padding: 4,
      borderRadius: 4,
      gap: 4,
      width: width / 2 - 16,
      height: 160,
      margin: 4,
    },
    title: {
      fontWeight: 700,
      flex: 1,
    },
    text: {
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
    },
  });

  return (
    <Pressable onPress={props.onPress} onLongPress={props.onLongPress}>
      <View style={styles.container}>
        <View style={{ backgroundColor: 'white', borderRadius: 4, flex: 1 }}>
          <Image
            style={{ flex: 1 }}
            source={{ uri: props.image }}
            contentFit="contain"
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.title, styles.text]}>{title}</Text>
          <Text style={styles.text}>{props.marks}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Post;
