import {
  View,
  useColorScheme,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import baseTheme from '@/constants/base-theme';
import ProfileHeader from '@/components/ProfileHeader';
import { Profile, Question } from '@/constants/models';
import { baseUrl } from '@/constants/base-url';
import Post from '@/components/Post';
import Spinner from '@/components/Spinner';

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const [profile, setProfile] = useState<Profile>();
  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Array<Question>>();
  const [postsLoading, setPostsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.background
          : baseTheme.dark.background,
      padding: 8,
      gap: 8,
    },
  });

  useEffect(() => {
    getProfile();
    getPosts();
  }, []);

  async function getProfile() {
    const response = await fetch(`${baseUrl}/users/${id}`);
    const data = await response.json();
    setProfile(data);
    setProfileLoading(false);
  }

  async function getPosts() {
    const response = await fetch(`${baseUrl}/users/${id}/questions`);
    const data = await response.json();
    setPosts(data);
    setPostsLoading(false);
  }

  async function onRefresh() {
    setRefreshing(true);
    await getPosts();
    setRefreshing(false);
  }

  return (
    <View style={styles.container}>
      {profileLoading || (
        <View style={{ padding: 8 }}>
          <ProfileHeader
            username={profile!.username}
            description={profile!.description}
            profilePicture={profile!.profilePicture}
          />
        </View>
      )}
      <FlatList
        contentContainerStyle={
          postsLoading
            ? {
                flex: 1,
                justifyContent: 'center',
              }
            : {}
        }
        data={posts}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<Spinner scale={2.5} />}
        showsVerticalScrollIndicator={false}
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
    </View>
  );
}
