import { FlatList, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import { baseUrl } from '@/constants/base-url';
import { getAccessToken } from '@/constants/token-access';
import QuestionView from '@/components/QuestionView';
import { Question } from '@/constants/models';

const HomeScreen = () => {
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await fetch(`${baseUrl}/questions`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    await getQuestions();
    setRefreshing(false);
  };

  return (
    <FlatList
      data={questions}
      pagingEnabled
      decelerationRate="fast"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      renderItem={(question) => {
        return (
          <QuestionView
            id={question.item._id}
            question={question.item.question}
            markScheme={question.item.markScheme}
            title={question.item.title}
            totalMarks={question.item.totalMarks}
          />
        );
      }}
    />
  );
};

export default HomeScreen;
