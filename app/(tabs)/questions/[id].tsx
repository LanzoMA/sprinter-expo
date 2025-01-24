import { Text, Icon } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Dimensions } from 'react-native';
import { ImageBackground } from 'expo-image';
import { useState } from 'react';

export default function QuestionScreen() {
  const { id } = useLocalSearchParams();
  const { width } = Dimensions.get('window');
  const [favorited, setFavorited] = useState<boolean>(false);

  const question = {
    _id: '1',
    question: require('@/assets/images/questions/question1.png'),
    markScheme: require('@/assets/images/questions/question1.png'),
    title: 'Polar Integration Question 8 Marks',
    description: '',
    course: 'A Level Edexcel Further Maths',
    totalMarks: 8,
    author: 'daniel brown',
  };

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      decelerationRate={'fast'}
    >
      <View style={{ backgroundColor: 'white', width }}>
        <ImageBackground
          style={{
            flex: 1,
            width: '100%',
            position: 'relative',
          }}
          source={question.question}
          contentFit="contain"
        >
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
            {question.title}
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
              color="black"
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
        </ImageBackground>
      </View>
      <View style={{ backgroundColor: 'white', width }}>
        <ImageBackground
          style={{
            flex: 1,
            width: '100%',
            position: 'relative',
          }}
          source={question.markScheme}
          contentFit="contain"
        >
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
            {question.title}
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
              color="black"
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
        </ImageBackground>
      </View>
    </ScrollView>
  );
}
