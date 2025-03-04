import { View, useColorScheme, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import SprinterSearchBar from '@/components/SprinterSearchBar';
import { Question } from '@/constants/models';
import baseTheme from '@/constants/base-theme';
import Post from '@/components/Post';
import { baseUrl } from '@/constants/base-url';
import { useSearchParams } from 'expo-router/build/hooks';

export default function SearchResultScreen() {
  const colorScheme = useColorScheme();
  const searchParams = useSearchParams();
  const minMarks = searchParams.get('minMarks');
  const maxMarks = searchParams.get('maxMarks');

  const [results, setResults] = useState<Array<Question>>([]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.background
          : baseTheme.dark.background,
      flex: 1,
    },
  });

  useEffect(() => {
    searchQuestions();
  }, []);

  async function searchQuestions() {
    const url = `${baseUrl}/questions/search?minMarks=${minMarks}&maxMarks=${maxMarks}`;
    const response = await fetch(url);
    const data = await response.json();
    setResults(data);
  }

  return (
    <View style={styles.container}>
      <SprinterSearchBar />
      <FlatList
        data={results}
        numColumns={2}
        renderItem={({ item }) => (
          <Post
            id={item._id}
            image={item.question}
            title={item.title}
            marks={item.totalMarks}
            onPress={() => router.push(`/questions/${item._id}`)}
          />
        )}
      />
    </View>
  );
}
