import { View, useColorScheme, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import baseTheme from '@/constants/base-theme';
import ProfileHeader from '@/components/ProfileHeader';
import { Question } from '@/constants/models';
import { baseUrl } from '@/constants/base-url';

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const [username, setUsername] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [posts, setPosts] = useState<Array<Question>>();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.background
          : baseTheme.dark.background,
      padding: 16,
    },
  });

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const response = await fetch(`${baseUrl}/users/${id}`);
    const data = await response.json();

    setUsername(data.username);
    setDescription(data.description);
    setProfilePicture(data.profilePicture);
  }

  return (
    <View style={styles.container}>
      <ProfileHeader
        username={username}
        description={description}
        profilePicture={profilePicture}
      />
    </View>
  );
}
