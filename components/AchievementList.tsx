import {
  FlatList,
  Text,
  RefreshControl,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import { useState, useEffect } from 'react';
import { Achievement } from '@/constants/models';
import AchievementCard from './AchievementCard';
import { getAccessToken } from '@/constants/token-access';
import { baseUrl } from '@/constants/base-url';
import baseTheme from '@/constants/base-theme';

export default function AchievementList() {
  const colorScheme = useColorScheme();
  const [achievements, setAchievements] = useState<Array<Achievement>>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const styles = StyleSheet.create({
    text: {
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
      textAlign: 'center',
    },
  });

  useEffect(() => {
    getAchievements();
  }, []);

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

  async function onRefresh() {
    setRefreshing(true);
    await getAchievements();
    setRefreshing(false);
  }

  return (
    <FlatList
      data={achievements}
      contentContainerStyle={
        achievements.length > 0
          ? { gap: 16 }
          : {
              flex: 1,
              justifyContent: 'center',
            }
      }
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
      ListEmptyComponent={<Text style={styles.text}>No achievements yet.</Text>}
      renderItem={({ item }) => (
        <AchievementCard
          name={item.achievement.name}
          description={item.achievement.description}
        />
      )}
    />
  );
}
