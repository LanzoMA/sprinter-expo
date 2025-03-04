import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { getQuestions } from '@/constants/download';
import { Question } from '@/constants/models';
import baseTheme from '@/constants/base-theme';
import Post from '@/components/Post';

export default function SavedScreen() {
  const colorScheme = useColorScheme();

  const [posts, setPosts] = useState<Array<Question>>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const styles = StyleSheet.create({
    container: {
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.background
          : baseTheme.dark.background,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
    },
  });

  useEffect(() => {
    getSavedQuestions();
  }, []);

  async function getSavedQuestions() {
    const questions = await getQuestions();
    setPosts(questions);
  }

  async function onRefresh() {
    setRefreshing(true);
    await getSavedQuestions();
    setRefreshing(false);
  }

  return (
    <FlatList
      style={{
        backgroundColor:
          colorScheme === 'light'
            ? baseTheme.light.background
            : baseTheme.dark.background,
      }}
      contentContainerStyle={{ flex: 1 }}
      data={posts}
      numColumns={2}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
      ListEmptyComponent={
        <View style={styles.container}>
          <Text style={styles.text}>No saved posts.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <Post
          id={item._id}
          image={item.question}
          title={item.title}
          marks={item.totalMarks}
          onPress={() => router.push(`/saved/${item._id}`)}
        />
      )}
    />
  );
}
