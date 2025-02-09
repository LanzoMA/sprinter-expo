import { Icon, Text, useTheme } from '@rneui/themed';
import { useState } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { ImageBackground } from 'expo-image';
import PagerView from 'react-native-pager-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Slider from '@react-native-community/slider';
import Chip from './Chip';

interface QuestionViewProps {
  question: string;
  markScheme: string;
  title: string;
  totalMarks: number;
}

const QuestionView = (props: QuestionViewProps) => {
  const { theme } = useTheme();

  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const [favorited, setFavorited] = useState<boolean>(false);

  const [marks, setMarks] = useState<number>(0);

  const { height } = Dimensions.get('window');
  const tabBarHeight = useBottomTabBarHeight();
  const visibleHeight = height - tabBarHeight;

  return (
    <View style={{ height: visibleHeight, backgroundColor: 'white' }}>
      <PagerView
        style={{
          flex: 1,
        }}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={() => setOverlayVisible(!overlayVisible)}
        >
          <ImageBackground
            style={{ flex: 1, position: 'relative' }}
            source={props.question}
            contentFit="contain"
          >
            {overlayVisible ? (
              <>
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
                  <Icon color="black" name="account-circle" size={36} />
                  <Pressable
                    onPress={() => {
                      setFavorited(!favorited);
                    }}
                  >
                    <Icon
                      color={favorited ? 'red' : 'black'}
                      name={favorited ? 'favorite' : 'favorite-outline'}
                      size={36}
                    />
                  </Pressable>
                  <Icon color="black" name="comment" size={36} />
                  <Icon color="black" name="download" size={36} />
                  <Icon color="black" name="ios-share" size={36} />
                </View>
              </>
            ) : null}
          </ImageBackground>
        </Pressable>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => setOverlayVisible(!overlayVisible)}
        >
          <ImageBackground
            style={{ flex: 1, padding: 8, flexDirection: 'column-reverse' }}
            source={props.markScheme}
            contentFit="contain"
          >
            <View
              style={{
                backgroundColor: theme.colors.surfaceTransparent,
                display: overlayVisible ? 'flex' : 'none',
                paddingVertical: 16,
                gap: 12,
                borderRadius: 16,
              }}
            >
              <Text style={{ textAlign: 'center' }}>Marks: {marks}</Text>
              <Slider
                step={1}
                thumbTintColor="white"
                minimumTrackTintColor={theme.colors.primary}
                onValueChange={(value) => {
                  setMarks(value);
                }}
                minimumValue={0}
                maximumValue={props.totalMarks}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <Chip title="Easy" color={theme.colors.blue} />
                <Chip title="Okay" color={theme.colors.green} />
                <Chip title="Medium" color={theme.colors.orange} />
                <Chip title="Hard" color={theme.colors.red} />
              </View>
            </View>
          </ImageBackground>
        </Pressable>
      </PagerView>
    </View>
  );
};

export default QuestionView;
