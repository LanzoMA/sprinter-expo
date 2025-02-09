import { Dimensions, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { baseUrl } from '@/constants/base-url';
import { getAccessToken } from '@/constants/token-access';
import QuestionView from '@/components/QuestionView';
import { Question } from '@/constants/models';

const HomeScreen = () => {
  const [questions, setQuestions] = useState<Array<Question>>([]);

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

  return (
    <FlatList
      data={questions}
      pagingEnabled
      decelerationRate="fast"
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
