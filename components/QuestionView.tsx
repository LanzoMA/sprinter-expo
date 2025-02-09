import { Icon, Text } from '@rneui/themed';
import { useState } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { Image } from 'expo-image';
import PagerView from 'react-native-pager-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

interface QuestionViewProps {
  question: string;
  markScheme: string;
  title: string;
}

const QuestionView = (props: QuestionViewProps) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [favorited, setFavorited] = useState<boolean>(false);

  const { height } = Dimensions.get('window');
  const tabBarHeight = useBottomTabBarHeight();
  const visibleHeight = height - tabBarHeight;

  return (
    <View style={{ height: visibleHeight, backgroundColor: 'white' }}>
      <PagerView
        style={{
          flex: 1,
          position: 'relative',
        }}
      >
        <Pressable style={{ flex: 1 }} onPress={() => setVisible(!visible)}>
          <Image
            style={{ flex: 1 }}
            source={props.question}
            contentFit="contain"
          />
        </Pressable>
        <Pressable style={{ flex: 1 }} onPress={() => setVisible(!visible)}>
          <Image
            style={{ flex: 1 }}
            source={props.markScheme}
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
            {props.title}
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
};

export default QuestionView;
