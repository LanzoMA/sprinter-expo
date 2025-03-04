import { FlatList, Pressable, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useTheme, Text } from '@rneui/themed';
import { getAccessToken } from '@/constants/token-access';
import { baseUrl } from '@/constants/base-url';
import { Course } from '@/constants/models';
import CourseCard from '@/components/CourseCard';
import SprinterSearchBar from '@/components/SprinterSearchBar';
import EditCoursesButton from '@/components/EditCoursesButton';

export default function ExploreScreen() {
  const { theme } = useTheme();

  const [courses, setCourses] = useState<Array<Course>>();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      padding: 16,
      gap: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    title: {
      fontWeight: 700,
      fontSize: 22,
    },
  });

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch(`${baseUrl}/account/courses`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      setCourses(data.courses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push('/(search)/search')}>
        <SprinterSearchBar editable={false} placeholder="Search Questions" />
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.title}>Your Courses</Text>
        <EditCoursesButton onPress={() => router.push('/course-selection')} />
      </View>

      <FlatList
        contentContainerStyle={{ gap: 16 }}
        data={courses}
        renderItem={(course) => {
          return (
            <CourseCard
              title={course.item.name}
              qualification={course.item.qualification}
              examBoard={course.item.examBoard}
              color={'#2A2C30'}
              chipColor={'#3B3F46'}
            />
          );
        }}
      />
    </View>
  );
}
