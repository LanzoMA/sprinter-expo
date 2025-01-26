import { Text, Icon } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Question } from '@/constants/models';
import { baseUrl } from '@/constants/base-url';

export default function QuestionScreen() {
  const { id } = useLocalSearchParams();
  const { width } = Dimensions.get('window');
  const [question, setQuestion] = useState<Question>();
  const [favorited, setFavorited] = useState<boolean>(false);

  useEffect(() => {
    getQuestion();
  }, []);

  async function getQuestion() {
    const response = await fetch(`${baseUrl}/questions/${id}`);
    const data = await response.json();

    setQuestion(data);
  }

  return (
    <View style={{ width, flex: 1 }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        style={{ backgroundColor: 'white', position: 'relative' }}
      >
        <Image
          style={{ width }}
          source={question?.question}
          contentFit="contain"
        />
        <Image
          style={{ width }}
          source={question?.markScheme}
          contentFit="contain"
        />
      </ScrollView>
      <Text
        style={{
          color: 'black',
          position: 'absolute',
          bottom: 8,
          left: 8,
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        {question?.title}
      </Text>
      <View
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          gap: 32,
        }}
      >
        <Icon color="black" name="account-circle" size={48} />
        <Icon
          color={favorited ? 'red' : 'black'}
          name={favorited ? 'favorite' : 'favorite-outline'}
          size={48}
          onPress={() => {
            setFavorited(!favorited);
          }}
        />
        <Icon color="black" name="comment" size={48} />
        <Icon color="black" name="download" size={48} />
        <Icon color="black" name="ios-share" size={48} />
      </View>
    </View>
  );
}
