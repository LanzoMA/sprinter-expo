import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SprinterButton from '@/components/SprinterButton';
import baseTheme from '@/constants/base-theme';
import { router } from 'expo-router';
import { Course } from '@/constants/models';
import { baseUrl } from '@/constants/base-url';
import { getAccessToken } from '@/constants/token-access';

export default function CourseSelectionScreen() {
  const colorScheme = useColorScheme();

  const [courses, setCourses] = useState<Array<Course>>([]);
  const [courseSelection, setCourseSelection] = useState<Array<string>>([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.background
          : baseTheme.dark.background,
      padding: 16,
      justifyContent: 'center',
      gap: 32,
    },
    text: {
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
      fontSize: 16,
    },
    main: {
      flex: 1,
      justifyContent: 'center',
      gap: 32,
    },
  });

  useEffect(() => {
    getCourses();
  }, []);

  async function getCourses() {
    const response = await fetch(`${baseUrl}/courses`);
    const data: Array<Course> = await response.json();
    setCourses(data);
  }

  async function handleContinue() {
    const accessToken = await getAccessToken();

    if (!accessToken) return;

    await fetch(`${baseUrl}/account/courses`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ courses: courseSelection }),
    });

    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.text}>Select the courses you are studying</Text>

        <View style={{ gap: 8 }}>
          {courses.map((course, index) => {
            return (
              <BouncyCheckbox
                key={index}
                text={`${course.qualification} ${course.examBoard} ${course.name}`}
                textStyle={{
                  color:
                    colorScheme === 'light'
                      ? baseTheme.light.text
                      : baseTheme.dark.text,
                  textDecorationLine: 'none',
                }}
                fillColor={baseTheme.common.primary}
                iconStyle={{
                  borderWidth: 1,
                  borderColor: baseTheme.common.primary,
                }}
                onPress={(checked) => {
                  checked
                    ? setCourseSelection([...courseSelection, course._id])
                    : setCourseSelection(
                        courseSelection.filter((item) => item !== course._id)
                      );
                }}
              />
            );
          })}
        </View>
      </View>
      <SprinterButton title="Continue" onPress={handleContinue} />
    </View>
  );
}
