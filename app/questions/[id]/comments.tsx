import {
  useColorScheme,
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { baseUrl } from '@/constants/base-url';
import { UserComment } from '@/constants/models';
import CommentCard from '@/components/CommentCard';
import baseTheme from '@/constants/base-theme';
import SprinterTextInput from '@/components/SprinterTextInput';
import { getWithToken, postWithToken } from '@/constants/network';

export default function CommentScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const [comments, setComments] = useState<Array<UserComment>>([]);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const styles = StyleSheet.create({
    container: {
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.background
          : baseTheme.dark.background,
      flex: 1,
      justifyContent: 'center',
    },
    text: {
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
      textAlign: 'center',
    },
    spinner: {
      transform: [{ scale: 1.5 }],
    },
  });

  useEffect(() => {
    getComments();
  }, []);

  async function getComments() {
    try {
      const comments = await getWithToken(
        `${baseUrl}/questions/${id}/comments`
      );
      setComments(comments);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function createComment() {
    try {
      await postWithToken(`${baseUrl}/questions/${id}/comments`, { comment });
      setComment('');
      setLoading(true);
      getComments();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ flex: 1 }}
        data={comments}
        ListEmptyComponent={
          <View style={styles.container}>
            {loading ? (
              <ActivityIndicator
                style={styles.spinner}
                size="large"
                color={colorScheme === 'light' ? '#000' : '#fff'}
              />
            ) : (
              <Text style={styles.text}>No comments yet.</Text>
            )}
          </View>
        }
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
      <View style={{ padding: 8 }}>
        <SprinterTextInput
          placeholder="Add a comment..."
          value={comment}
          onChangeText={(text) => setComment(text)}
          onSubmitEditing={createComment}
        />
      </View>
    </View>
  );
}
