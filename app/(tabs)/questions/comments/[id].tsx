import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Text, useTheme } from '@rneui/themed';
import { baseUrl } from '@/constants/base-url';
import { UserComment } from '@/constants/models';
import CommentCard from '@/components/CommentCard';
import { getAccessToken } from '@/constants/token-access';

export default function CommentScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const [comments, setComments] = useState<Array<UserComment>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getComments();
  }, []);

  async function getComments() {
    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await fetch(`${baseUrl}/questions/${id}/comments`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      setComments(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        justifyContent: 'center',
      }}
    >
      {loading ? (
        <Text style={{ textAlign: 'center' }}>Loading...</Text>
      ) : comments.length === 0 ? (
        <Text style={{ textAlign: 'center' }}>No comments yet.</Text>
      ) : (
        <FlatList
          data={comments}
          renderItem={({ item }) => {
            return (
              <CommentCard
                username={item.user.username}
                profilePicture={item.user.profilePicture}
                comment={item.comment}
              />
            );
          }}
        />
      )}
    </View>
  );
}
