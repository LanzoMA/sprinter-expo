import { FlatList, Pressable, View } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useTheme, Text, SearchBar } from '@rneui/themed';
import { getAccessToken } from '@/constants/token-access';
import { baseUrl } from '@/constants/base-url';
import { Course } from '@/constants/models';
import courseColors from '@/constants/course-colors';
import CourseCard from '@/components/CourseCard';
import SprinterSearchBar from '@/components/SprinterSearchBar';

export default function SearchScreen() {
  const { theme } = useTheme();

  const [courses, setCourses] = useState<Array<Course>>();

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
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        padding: 16,
        gap: 16,
      }}
    >
      <Pressable onPress={() => router.push('/(search)/search')}>
        <SprinterSearchBar editable={false} placeholder="Search Questions" />
      </Pressable>

      <Text style={{ fontWeight: 700, fontSize: 22 }}>Your Courses</Text>

      <FlatList
        contentContainerStyle={{ gap: 16 }}
        data={courses}
        renderItem={(course) => {
          const cardColor: string =
            courseColors[course.item._id]?.color || '#2A2C30';
          const chipColor: string =
            courseColors[course.item._id]?.chipColor || '#3B3F46';

          return (
            <CourseCard
              title={course.item.name}
              qualification={course.item.qualification}
              examBoard={course.item.examBoard}
              color={cardColor}
              chipColor={chipColor}
            />
          );
        }}
      />
    </View>
  );
}
