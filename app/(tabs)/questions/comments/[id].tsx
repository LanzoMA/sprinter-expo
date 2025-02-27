import CommentCard from '@/components/CommentCard';
import { UserComment } from '@/constants/models';
import { FlatList } from 'react-native-gesture-handler';

export default function CommentScreen() {
  const comments: Array<UserComment> = [
    {
      username: 'lanzo',
      profilePicture: 'https://avatar.iran.liara.run/public/1',
      comment: 'comment text',
    },
    {
      username: 'johndoe',
      profilePicture: 'https://avatar.iran.liara.run/public/29',
      comment: 'comment text',
    },
    {
      username: 'charles smith',
      profilePicture: 'https://avatar.iran.liara.run/public/40',
      comment: 'comment text',
    },
    {
      username: 'miles',
      profilePicture: 'https://avatar.iran.liara.run/public/45',
      comment: 'comment text',
    },
    {
      username: 'johndoe',
      profilePicture: 'https://avatar.iran.liara.run/public/29',
      comment: 'comment text',
    },
    {
      username: 'charles smith',
      profilePicture: 'https://avatar.iran.liara.run/public/40',
      comment: 'comment text',
    },
    {
      username: 'miles',
      profilePicture: 'https://avatar.iran.liara.run/public/45',
      comment: 'comment text',
    },
    {
      username: 'johndoe',
      profilePicture: 'https://avatar.iran.liara.run/public/29',
      comment: 'comment text',
    },
    {
      username: 'charles smith',
      profilePicture: 'https://avatar.iran.liara.run/public/40',
      comment: 'comment text',
    },
  ];

  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => {
        return (
          <CommentCard
            username={item.username}
            profilePicture={item.profilePicture}
            comment={item.comment}
          />
        );
      }}
    />
  );
}
