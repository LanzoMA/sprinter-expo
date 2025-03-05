import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { ListItem, Text } from '@rneui/themed';
import { baseProfilePicture } from '@/constants/base-profile-picture';

interface CommentCardProps {
  username: string;
  profilePicture: string;
  comment: string;
}

export default function CommentCard(props: CommentCardProps) {
  const styles = StyleSheet.create({
    image: {
      width: 48,
      height: 48,
      borderRadius: 1024,
    },
    details: {
      justifyContent: 'flex-start',
      height: '100%',
    },
    text: {
      fontWeight: 700,
      fontSize: 12,
    },
  });

  return (
    <ListItem>
      <Image
        style={styles.image}
        source={{
          uri: props.profilePicture || baseProfilePicture,
        }}
      />
      <ListItem.Content style={styles.details}>
        <Text style={styles.text}>@{props.username}</Text>
        <Text>{props.comment}</Text>
      </ListItem.Content>
    </ListItem>
  );
}
