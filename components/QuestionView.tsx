import { Icon, Text, useTheme, Button } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { Dimensions, Pressable, View, StyleSheet } from 'react-native';
import { ImageBackground } from 'expo-image';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import PagerView from 'react-native-pager-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Slider from '@react-native-community/slider';
import Toast from 'react-native-toast-message';
import Chip from './Chip';
import { getAccessToken } from '@/constants/token-access';
import { baseUrl } from '@/constants/base-url';
import { router } from 'expo-router';
import { storeQuestion } from '@/constants/download';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Achievement } from '@/constants/models';

interface QuestionViewProps {
  id: string;
  question: string;
  markScheme: string;
  title: string;
  totalMarks: number;
  author: string;
  withBottomBar?: boolean;
}

export default function QuestionView(props: QuestionViewProps) {
  const { theme } = useTheme();

  const [favorites, setFavorites] = useState<number>(0);
  const [favorited, setFavorited] = useState<boolean>(false);

  const iconSize = 40;
  const iconColor = '#000000bb';
  const [overlayVisible, setOverlayVisible] = useState<boolean>(true);

  const difficulties = ['Easy', 'Okay', 'Medium', 'Hard'];

  const [marks, setMarks] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  let visibleHeight;

  if (props.withBottomBar) {
    const { height } = Dimensions.get('window');
    const tabBarHeight = useBottomTabBarHeight();
    visibleHeight = height - tabBarHeight;
  }

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pinchHandler = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.max(1, savedScale.value * e.scale);
    })
    .onEnd((e) => {
      savedScale.value = scale.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    getFavorites();
    getIsFavorited();
  }, []);

  const getFavorites = async () => {
    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await fetch(
        `${baseUrl}/questions/${props.id}/favorites`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      setFavorites(data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const getIsFavorited = async () => {
    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await fetch(
        `${baseUrl}/questions/${props.id}/favorited`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      setFavorited(data.isFavorited);
    } catch (error) {
      console.error(error);
    }
  };

  const favoriteQuestion = async () => {
    setFavorited(true);
    setFavorites(favorites + 1);

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      await fetch(`${baseUrl}/questions/${props.id}/favorites`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const unfavoriteQuestion = async () => {
    setFavorited(false);
    setFavorites(favorites - 1);

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      await fetch(`${baseUrl}/questions/${props.id}/favorites`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  async function download() {
    await storeQuestion({
      _id: props.id,
      question: props.question,
      markScheme: props.markScheme,
      title: props.title,
      description: '',
      course: '',
      totalMarks: props.totalMarks,
      author: props.author,
      favorited: false,
    });
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Successfully saved question',
    });
  }

  async function share() {
    const questionFileUri = FileSystem.documentDirectory + 'question.png';
    const markSchemeFileUri = FileSystem.documentDirectory + 'mark-scheme.png';

    await FileSystem.writeAsStringAsync(
      questionFileUri,
      props.question.split(',')[1],
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );

    await FileSystem.writeAsStringAsync(
      markSchemeFileUri,
      props.markScheme.split(',')[1],
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );

    await Sharing.shareAsync(questionFileUri);
    await Sharing.shareAsync(markSchemeFileUri);
  }

  const submitRating = async () => {
    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await fetch(`${baseUrl}/questions/${props.id}/ratings`, {
        method: 'POST',

        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ marks, difficulty }),
      });

      setCompleted(true);

      if (response.status === 200) {
        const data: Achievement = await response.json();

        Toast.show({
          type: 'success',
          text1: `Achievement Unlocked: ${data.achievement.name}`,
          text2: data.achievement.description,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const styles = StyleSheet.create({
    container: { height: visibleHeight || '100%', backgroundColor: 'white' },
    interactions: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 16,
      right: 16,
      gap: 20,
    },
  });

  return (
    <View style={styles.container}>
      <PagerView
        style={{
          flex: 1,
        }}
      >
        <GestureDetector gesture={pinchHandler}>
          <Animated.View style={[{ flex: 1 }, animatedStyle]}>
            <Pressable
              style={{ flex: 1 }}
              onPress={() => {
                setOverlayVisible(!overlayVisible);
              }}
            >
              <ImageBackground
                style={{ flex: 1, position: 'relative', alignItems: 'center' }}
                source={props.question}
                contentFit="contain"
              >
                <Text
                  style={{
                    color: 'black',
                    position: 'absolute',
                    top: 8,
                    left: 8,
                  }}
                >
                  {overlayVisible
                    ? 'Tap to Hide Details'
                    : 'Tap to Show Details'}
                </Text>
                {overlayVisible && (
                  <>
                    <Text
                      style={{
                        color: 'black',
                        position: 'absolute',
                        bottom: 160,
                      }}
                    >
                      Swipe &rarr; To View Markscheme
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        position: 'absolute',
                        top: 48,
                        textAlign: 'center',
                        width: '100%',
                        fontWeight: 700,
                        fontSize: 16,
                      }}
                    >
                      {props.title}
                    </Text>
                    <View style={styles.interactions}>
                      <Pressable
                        onPress={() => router.push(`/profile/${props.author}`)}
                      >
                        <Icon
                          color={iconColor}
                          name="account-circle"
                          size={iconSize}
                        />
                      </Pressable>

                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 8,
                        }}
                      >
                        <Pressable
                          onPress={() => {
                            favorited
                              ? unfavoriteQuestion()
                              : favoriteQuestion();
                          }}
                        >
                          <Icon
                            color={favorited ? 'red' : iconColor}
                            name={favorited ? 'favorite' : 'favorite-outline'}
                            size={iconSize}
                          />
                        </Pressable>
                        <Text
                          style={{
                            color: 'black',
                            fontWeight: 700,
                            fontSize: 18,
                          }}
                        >
                          {favorites}
                        </Text>
                      </View>

                      <Pressable
                        onPress={() =>
                          router.push(`/questions/${props.id}/comments`)
                        }
                      >
                        <Icon
                          color={iconColor}
                          name="comment"
                          size={iconSize}
                        />
                      </Pressable>

                      <Pressable onPress={download}>
                        <Icon
                          color={iconColor}
                          name="download"
                          size={iconSize}
                        />
                      </Pressable>

                      <Pressable onPress={share}>
                        <Icon
                          color={iconColor}
                          name="ios-share"
                          size={iconSize}
                        />
                      </Pressable>
                    </View>
                  </>
                )}
              </ImageBackground>
            </Pressable>
          </Animated.View>
        </GestureDetector>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => setOverlayVisible(!overlayVisible)}
        >
          <ImageBackground
            style={{ flex: 1, padding: 8, flexDirection: 'column-reverse' }}
            source={props.markScheme}
            contentFit="contain"
          >
            {completed || (
              <>
                <Text
                  style={{
                    color: 'black',
                    position: 'absolute',
                    top: 8,
                    left: 8,
                  }}
                >
                  {overlayVisible
                    ? 'Tap to Hide Details'
                    : 'Tap to Show Details'}
                </Text>
                <Pressable>
                  <View
                    style={{
                      backgroundColor: theme.colors.surfaceTransparent,
                      display: overlayVisible ? 'flex' : 'none',
                      paddingVertical: 8,
                      gap: 16,
                      borderRadius: 16,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      How many marks did you get? {marks}
                    </Text>

                    <Slider
                      style={{ width: '100%' }}
                      step={1}
                      thumbTintColor="white"
                      minimumTrackTintColor={theme.colors.primary}
                      onValueChange={(value) => {
                        setMarks(value);
                      }}
                      minimumValue={0}
                      maximumValue={props.totalMarks}
                    />

                    <Text style={{ fontSize: 16 }}>
                      Select Question Difficulty: {difficulties[difficulty]}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: '100%',
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

                    <Button
                      buttonStyle={{ paddingVertical: 4 }}
                      title="Submit"
                      onPress={submitRating}
                    />
                  </View>
                </Pressable>
              </>
            )}
          </ImageBackground>
        </Pressable>
      </PagerView>
    </View>
  );
}
