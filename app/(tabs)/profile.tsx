import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import { Tab, TabView, useTheme, Text, Icon } from '@rneui/themed';
import BottomSheet from '@gorhom/bottom-sheet';
import AchievementCard from '@/components/AchievementCard';
import Post from '@/components/Post';
import { baseUrl } from '@/constants/base-url';
import { Achievement, Question } from '@/constants/models';
import { getAccessToken, getUserDetails } from '@/constants/token-access';
import EditProfileButton from '@/components/EditProfileButton';
import EditProfileBottomSheet from '@/components/EditProfileBottomSheet';
import Spinner from '@/components/Spinner';
import ProfileHeader from '@/components/ProfileHeader';
import AnalyticView from '@/components/AnalyticView';
import baseTheme from '@/constants/base-theme';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const colorScheme = useColorScheme();

  const [tabIndex, setTabIndex] = useState<number>(0);

  const [profilePicture, setProfilePicture] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Array<Question>>();
  const [achievements, setAchievements] = useState<Array<Achievement>>([]);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const styles = StyleSheet.create({
    container: {
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.background
          : baseTheme.dark.background,
      flex: 1,
    },
  });

  useEffect(() => {
    getProfile();
    getPosts();
    getAchievements();
  }, []);

  const getProfile = async () => {
    const user = await getUserDetails();

    if (!user) return;

    const accessToken = await getAccessToken();

    if (!accessToken) return;

    try {
      const response = await fetch(`${baseUrl}/users/${user.id}`, {
        headers: {
          Auhorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      setProfilePicture(data.profilePicture);
      setUsername(data.username);
      setDescription(data.description);
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async () => {
    try {
      const user = await getUserDetails();

      if (!user) {
        throw new Error('Access token not found');
      }

      const response = await fetch(`${baseUrl}/users/${user.id}/questions`);
      const data = await response.json();

      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getPosts();
    setRefreshing(false);
  };

  const getAchievements = async () => {
    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await fetch(`${baseUrl}/account/achievements`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      setAchievements(data.achievements);
    } catch (error) {
      console.log(error);
    }
  };

  function goToSettings() {
    router.push('/settings');
  }

  return (
    <View style={styles.container}>
      <View style={{ padding: 8 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }} />
          <Icon
            name="settings"
            type="material"
            size={24}
            color={theme.colors.text}
            style={{
              padding: 8,
            }}
            onPress={goToSettings}
          />
        </View>

        <ProfileHeader
          username={username}
          description={description}
          profilePicture={profilePicture}
        >
          <EditProfileButton onPress={() => bottomSheetRef.current?.expand()} />
        </ProfileHeader>
      </View>

      <Tab
        value={tabIndex}
        onChange={(tabIndex) => setTabIndex(tabIndex)}
        buttonStyle={{
          height: 60,
          backgroundColor:
            colorScheme === 'light'
              ? baseTheme.light.background
              : baseTheme.dark.background,
        }}
        indicatorStyle={{
          backgroundColor:
            colorScheme === 'light'
              ? baseTheme.light.text
              : baseTheme.dark.text,
        }}
        variant="primary"
      >
        <Tab.Item
          icon={{
            name: 'photo-library',
            type: 'material',
            color:
              colorScheme === 'light'
                ? baseTheme.light.text
                : baseTheme.dark.text,
          }}
        />
        <Tab.Item
          icon={{
            name: 'bar-chart',
            type: 'material',
            color:
              colorScheme === 'light'
                ? baseTheme.light.text
                : baseTheme.dark.text,
          }}
        />
        <Tab.Item
          icon={{
            name: 'trophy',
            type: 'ionicon',
            color:
              colorScheme === 'light'
                ? baseTheme.light.text
                : baseTheme.dark.text,
          }}
        />
      </Tab>

      <TabView value={tabIndex} onChange={setTabIndex}>
        <TabView.Item
          style={{
            width: '100%',
            padding: 8,
            justifyContent: 'center',
          }}
        >
          <FlatList
            contentContainerStyle={
              loading || posts!.length === 0
                ? {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : {}
            }
            data={posts}
            numColumns={2}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              loading ? <Spinner scale={2.5} /> : <Text>No posts found</Text>
            }
            renderItem={(post) => {
              return (
                <Post
                  id={post.item._id}
                  image={post.item.question}
                  title={post.item.title}
                  marks={post.item.totalMarks}
                  onPress={() => router.push(`/questions/${post.item._id}`)}
                />
              );
            }}
          />
        </TabView.Item>

        <TabView.Item style={{ width: '100%', padding: 8 }}>
          <AnalyticView />
        </TabView.Item>

        <TabView.Item
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {achievements.length > 0 ? (
            <FlatList
              style={{ width: '100%', padding: 8 }}
              data={achievements}
              contentContainerStyle={{ gap: 16 }}
              renderItem={(achievements) => {
                const { name, description } = achievements.item.achievement;

                return (
                  <AchievementCard name={name} description={description} />
                );
              }}
            />
          ) : (
            <Text style={{ textAlign: 'center' }}>No achievements yet.</Text>
          )}
        </TabView.Item>
      </TabView>

      <EditProfileBottomSheet
        bottomSheetRef={bottomSheetRef}
        username={username}
        description={description}
        profilePicture={profilePicture}
      />
    </View>
  );
}
