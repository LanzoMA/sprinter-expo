import { Text, FlatList, RefreshControl, View } from 'react-native';
import { useEffect, useState } from 'react';
import { baseUrl } from '@/constants/base-url';
import { getAccessToken } from '@/constants/token-access';
import QuestionView from '@/components/QuestionView';
import { Question } from '@/constants/models';
import Spinner from '@/components/Spinner';

export default function HomeScreen() {
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    getNewQuestions();
  }, []);

  async function getNewQuestions() {
    setLoading(true);

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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

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
      contentContainerStyle={{
        flex: questions.length > 0 ? 0 : 1,
      }}
      data={questions}
      pagingEnabled
      decelerationRate="fast"
      ListEmptyComponent={
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {loading ? (
            <Spinner color="#000" scale={1.5} />
          ) : (
            <Text style={{ textAlign: 'center' }}>
              Sorry, no uncompleted questions found for your courses
            </Text>
          )}
        </View>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      onEndReached={() => {
        if (questions.length !== 0) getMoreQuestions();
      }}
      onEndReachedThreshold={7}
      renderItem={({ item }) => {
        return (
          <QuestionView
            id={item._id}
            question={item.question}
            markScheme={item.markScheme}
            title={item.title}
            description={item.description}
            totalMarks={item.totalMarks}
            author={item.author}
            withBottomBar
          />
        );
      }}
    />
  );
}
