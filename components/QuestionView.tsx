import { Icon, Text, useTheme } from '@rneui/themed';
import { useState } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { ImageBackground } from 'expo-image';
import PagerView from 'react-native-pager-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Slider from '@react-native-community/slider';
import Chip from './Chip';
import { getAccessToken } from '@/constants/token-access';
import { baseUrl } from '@/constants/base-url';

interface QuestionViewProps {
  id: string;
  question: string;
  markScheme: string;
  title: string;
  totalMarks: number;
}

const QuestionView = (props: QuestionViewProps) => {
  const { theme } = useTheme();

  const iconSize = 40;
  const [overlayVisible, setOverlayVisible] = useState<boolean>(true);
  const [favorited, setFavorited] = useState<boolean>(false);

  const difficulties = ['Easy', 'Okay', 'Medium', 'Hard'];

  const [marks, setMarks] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const { height } = Dimensions.get('window');
  const tabBarHeight = useBottomTabBarHeight();
  const visibleHeight = height - tabBarHeight;

  const submitRating = async () => {
    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      await fetch(`${baseUrl}/questions/${props.id}/ratings`, {
        method: 'POST',

        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ marks, difficulty }),
      });

      setCompleted(true);
    } catch (error) {
      console.error(error);
    }
  };

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
                  <Icon color="black" name="account-circle" size={iconSize} />
                  <Pressable
                    onPress={() => {
                      setFavorited(!favorited);
                    }}
                  >
                    <Icon
                      color={favorited ? 'red' : 'black'}
                      name={favorited ? 'favorite' : 'favorite-outline'}
                      size={iconSize}
                    />
                  </Pressable>
                  <Icon color="black" name="comment" size={iconSize} />
                  <Icon color="black" name="download" size={iconSize} />
                  <Icon color="black" name="ios-share" size={iconSize} />
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
            {completed ? null : (
              <View
                style={{
                  backgroundColor: theme.colors.surfaceTransparent,
                  display: overlayVisible ? 'flex' : 'none',
                  paddingVertical: 8,
                  gap: 12,
                  borderRadius: 16,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center', flex: 1, fontSize: 16 }}>
                    Marks: {marks}
                  </Text>
                  <Text style={{ textAlign: 'center', flex: 1, fontSize: 16 }}>
                    Difficulty: {difficulties[difficulty]}
                  </Text>

                  <Icon
                    style={{ padding: 4 }}
                    containerStyle={{ marginRight: 16, borderRadius: 1024 }}
                    name="check"
                    size={32}
                    onPress={submitRating}
                  />
                </View>

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
                  <Chip
                    title="Easy"
                    color={theme.colors.blue}
                    onPress={() => {
                      setDifficulty(0);
                    }}
                  />
                  <Chip
                    title="Okay"
                    color={theme.colors.green}
                    onPress={() => {
                      setDifficulty(1);
                    }}
                  />
                  <Chip
                    title="Medium"
                    color={theme.colors.orange}
                    onPress={() => {
                      setDifficulty(2);
                    }}
                  />
                  <Chip
                    title="Hard"
                    color={theme.colors.red}
                    onPress={() => {
                      setDifficulty(3);
                    }}
                  />
                </View>
              </View>
            )}
          </ImageBackground>
        </Pressable>
      </PagerView>
    </View>
  );
};

export default QuestionView;
