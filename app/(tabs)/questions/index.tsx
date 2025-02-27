import { FlatList, RefreshControl } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { baseUrl } from '@/constants/base-url';
import { getAccessToken } from '@/constants/token-access';
import QuestionView from '@/components/QuestionView';
import { Question } from '@/constants/models';

export default function HomeScreen() {
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    getNewQuestions();
  }, []);

  const getNewQuestions = async () => {
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

  async function getMoreQuestions() {
    setRefreshing(true);

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

      setQuestions([...questions, ...data]);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await getNewQuestions();
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
      onEndReached={() => getMoreQuestions()}
      onEndReachedThreshold={7}
      renderItem={({ item }) => {
        return (
          <QuestionView
            id={item._id}
            question={item.question}
            markScheme={item.markScheme}
            title={item.title}
            totalMarks={item.totalMarks}
          />
        );
      }}
    />
  );
}
