import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  useColorScheme,
} from 'react-native';
import { useState, useEffect } from 'react';
import CourseStatisticCard from './CourseStatisticCard';
import { getAccessToken } from '@/constants/token-access';
import baseTheme from '@/constants/base-theme';
import { baseUrl } from '@/constants/base-url';

export default function AnalyticView() {
  const colorScheme = useColorScheme();
  const [dailyStreak, setDailyStreak] = useState<number>(0);
  const [statistics, setStatistics] = useState<Record<string, number>>({});
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const styles = StyleSheet.create({
    dailyStreakContainer: {
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.surface
          : baseTheme.dark.surface,
      padding: 16,
      borderRadius: 8,
    },
    dailyStreakText: {
      fontWeight: 700,
      fontSize: 16,
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
    },
  });

  useEffect(() => {
    getDailyStreak();
    getStatistics();
  }, []);

  async function getDailyStreak() {
    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await fetch(`${baseUrl}/account/daily-streak`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      setDailyStreak(data.streak);
    } catch (error) {
      console.error(error);
    }
  }

  async function getStatistics() {
    try {
      const accessToken = await getAccessToken();

      if (!accessToken) throw new Error('Access token not found');

      const response = await fetch(`${baseUrl}/account/statistics`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      setStatistics(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    await getDailyStreak();
    await getStatistics();
    setRefreshing(false);
  }

  return (
    <View style={{ gap: 16 }}>
      <View style={styles.dailyStreakContainer}>
        <Text style={styles.dailyStreakText}>
          Daily Streak: {dailyStreak} 🔥
        </Text>
      </View>

      <FlatList
        contentContainerStyle={{ gap: 16 }}
        data={Object.entries(statistics)}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        renderItem={({ item }) => (
          <CourseStatisticCard course={item[0]} percentage={item[1]} />
        )}
      />
    </View>
  );
}
