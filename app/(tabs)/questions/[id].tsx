import { Text, Icon } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import { View, Dimensions, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import PagerView from 'react-native-pager-view';
import { Question } from '@/constants/models';
import { baseUrl } from '@/constants/base-url';

export default function QuestionScreen() {
  const { id } = useLocalSearchParams();
  const { width } = Dimensions.get('window');
  const [question, setQuestion] = useState<Question>();
  const [favorited, setFavorited] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    getQuestion();
  }, []);

  async function getQuestion() {
    const response = await fetch(`${baseUrl}/questions/${id}`);
    const data = await response.json();

    setQuestion(data);
  }

  return (
    <View style={{ width, flex: 1, backgroundColor: 'white' }}>
      <PagerView
        style={{
          flex: 1,
          position: 'relative',
        }}
      >
        <Pressable style={{ flex: 1 }} onPress={() => setVisible(!visible)}>
          <Image
            style={{ flex: 1 }}
            source={question?.question}
            contentFit="contain"
          />
        </Pressable>
        <Pressable style={{ flex: 1 }} onPress={() => setVisible(!visible)}>
          <Image
            style={{ flex: 1 }}
            source={question?.markScheme}
            contentFit="contain"
          />
        </Pressable>
      </PagerView>
      {visible ? null : (
        <View>
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
            <Pressable
              onPress={() => {
                setFavorited(!favorited);
              }}
            >
              <Icon
                color={favorited ? 'red' : 'black'}
                name={favorited ? 'favorite' : 'favorite-outline'}
                size={48}
              />
            </Pressable>
            <Icon color="black" name="comment" size={48} />
            <Icon color="black" name="download" size={48} />
            <Icon color="black" name="ios-share" size={48} />
          </View>
        </View>
      )}
    </View>
  );
}
