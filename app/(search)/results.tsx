import { View, Text, useColorScheme, StyleSheet, FlatList } from 'react-native';
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
  const difficulty = searchParams.get('difficulty');
  const course = searchParams.get('course');

  const [results, setResults] = useState<Array<Question>>([]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.background
          : baseTheme.dark.background,
      flex: 1,
    },
    header: {
      padding: 8,
    },
    text: {
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
    },
  });

  useEffect(() => {
    searchQuestions();
  }, []);

  async function searchQuestions() {
    let url = `${baseUrl}/questions/search?minMarks=${minMarks}&maxMarks=${maxMarks}`;

    if (difficulty) url += `&difficulty=${difficulty}`;
    if (course) url += `&course=${course}`;

    const response = await fetch(url);
    const data = await response.json();
    setResults(data);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SprinterSearchBar />
      </View>
      <FlatList
        data={results}
        numColumns={2}
        ListEmptyComponent={
          <Text style={styles.text}>No questions found.</Text>
        }
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
