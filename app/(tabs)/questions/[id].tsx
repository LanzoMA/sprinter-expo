import { Skeleton } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Question } from '@/constants/models';
import { baseUrl } from '@/constants/base-url';
import QuestionView from '@/components/QuestionView';

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
    <Skeleton
      style={{ width: '100%', flex: 1 }}
      animation="wave"
      width={80}
      height={40}
    />
  ) : (
    <QuestionView
      question={question!.question}
      markScheme={question!.markScheme}
      title={question!.title}
      totalMarks={question!.totalMarks}
    />
  );
}
