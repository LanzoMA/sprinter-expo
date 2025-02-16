import { Icon, Text, useTheme, Button } from '@rneui/themed';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { ImageBackground } from 'expo-image';
import PagerView from 'react-native-pager-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Slider from '@react-native-community/slider';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
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

  const [favorites, setFavorites] = useState<number>(0);

  const iconSize = 40;
  const iconColor = '#000000bb';
  const [overlayVisible, setOverlayVisible] = useState<boolean>(true);
  const [favorited, setFavorited] = useState<boolean>(false);

  const commentSheetRef = useRef<BottomSheet>(null);
  const [isCommentSheetOpen, setIsCommentSheetOpen] = useState<boolean>(false);

  const comments = [
    {
      username: 'lanzo',
      comment: 'comment text',
    },
    {
      username: 'johndoe',
      comment: 'comment text',
    },
    {
      username: 'charles smith',
      comment: 'comment text',
    },
  ];

  const difficulties = ['Easy', 'Okay', 'Medium', 'Hard'];

  const [marks, setMarks] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const { height } = Dimensions.get('window');
  const tabBarHeight = useBottomTabBarHeight();
  const visibleHeight = height - tabBarHeight;

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
          onPress={() => {
            if (isCommentSheetOpen) {
              commentSheetRef.current?.close();
              setIsCommentSheetOpen(false);
              return;
            }

            setOverlayVisible(!overlayVisible);
          }}
        >
          <ImageBackground
            style={{ flex: 1, position: 'relative' }}
            source={props.question}
            contentFit="contain"
          >
            {overlayVisible ? (
              <>
                <Text
                  style={{ color: 'black', position: 'absolute', right: 8 }}
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
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    gap: 20,
                  }}
                >
                  <Icon
                    color={iconColor}
                    name="account-circle"
                    size={iconSize}
                  />
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: 8,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        favorited ? unfavoriteQuestion() : favoriteQuestion();
                      }}
                    >
                      <Icon
                        color={favorited ? 'red' : iconColor}
                        name={favorited ? 'favorite' : 'favorite-outline'}
                        size={iconSize}
                      />
                    </Pressable>
                    <Text
                      style={{ color: 'black', fontWeight: 700, fontSize: 18 }}
                    >
                      {favorites}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => {
                      if (commentSheetRef.current) {
                        commentSheetRef.current.expand();
                        setIsCommentSheetOpen(true);
                      }
                    }}
                  >
                    <Icon color={iconColor} name="comment" size={iconSize} />
                  </Pressable>

                  <Icon color={iconColor} name="download" size={iconSize} />
                  <Icon color={iconColor} name="ios-share" size={iconSize} />
                </View>
              </>
            ) : null}
            <BottomSheet
              backgroundStyle={{ backgroundColor: theme.colors.background }}
              handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
              snapPoints={['66%']}
              enablePanDownToClose
              ref={commentSheetRef}
              enableDynamicSizing={false}
              index={-1}
            >
              <Pressable>
                <BottomSheetView>
                  <BottomSheetFlatList
                    style={{
                      padding: 8,
                      height: '100%',
                    }}
                    data={comments}
                    renderItem={({ item }) => {
                      return (
                        <View>
                          <Text>{item.username}</Text>
                          <Text>{item.comment}</Text>
                        </View>
                      );
                    }}
                  />
                </BottomSheetView>
              </Pressable>
            </BottomSheet>
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
            )}
          </ImageBackground>
        </Pressable>
      </PagerView>
    </View>
  );
};

export default QuestionView;
