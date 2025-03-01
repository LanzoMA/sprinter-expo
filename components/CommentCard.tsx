import { Image } from 'expo-image';
import { ListItem, Text } from '@rneui/themed';

interface CommentCardProps {
  username: string;
  profilePicture: string;
  comment: string;
}

const CommentCard = (props: CommentCardProps) => {
  return (
    <ListItem>
      <Image
        style={{ width: 48, height: 48, borderRadius: 1024 }}
        source={{
          uri:
            props.profilePicture ||
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        }}
      />
      <ListItem.Content
        style={{
          justifyContent: 'flex-start',
          height: '100%',
        }}
      >
        <Text style={{ fontWeight: 700, fontSize: 12 }}>@{props.username}</Text>
        <Text>{props.comment}</Text>
      </ListItem.Content>
    </ListItem>
  );
};

export default CommentCard;
