import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Question } from '@/constants/models';
import { baseUrl } from '@/constants/base-url';
import QuestionView from '@/components/QuestionView';
import Spinner from '@/components/Spinner';

export default function QuestionScreen() {
  const { id } = useLocalSearchParams();
  const [question, setQuestion] = useState<Question>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getQuestion();
  }, []);

  async function getQuestion() {
    const response = await fetch(`${baseUrl}/questions/${id}`);
    const data = await response.json();

    setQuestion(data);
    setLoading(false);
  }

  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Spinner color="#000" scale={2.5} />
    </View>
  ) : (
    <QuestionView
      id={question!._id}
      question={question!.question}
      markScheme={question!.markScheme}
      title={question!.title}
      totalMarks={question!.totalMarks}
      author={question!.author}
    />
  );
}
