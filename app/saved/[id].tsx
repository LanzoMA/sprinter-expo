import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import PagerView from 'react-native-pager-view';
import { Question } from '@/constants/models';
import { getQuestionById } from '@/constants/download';

export default function SavedQuestionScreen() {
  const { id } = useLocalSearchParams();

  const [question, setQuestion] = useState<Question>();

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    image: { flex: 1 },
  });

  useEffect(() => {
    getQuestionData();
  }, []);

  async function getQuestionData() {
    const question = await getQuestionById(id as string);
    setQuestion(question);
  }

  return (
    <PagerView style={styles.container}>
      <Image
        source={{ uri: question?.question }}
        style={styles.image}
        contentFit="contain"
      />
      <Image
        source={{ uri: question?.markScheme }}
        style={styles.image}
        contentFit="contain"
      />
    </PagerView>
  );
}
