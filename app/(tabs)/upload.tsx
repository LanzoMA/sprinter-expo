import {
  View,
  Pressable,
  StyleSheet,
  FlatList,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { useEffect, useState } from 'react';
import { ImageBackground } from 'expo-image';
import { useTheme, Text, Icon } from '@rneui/themed';
import Slider from '@react-native-community/slider';
import { baseUrl } from '@/constants/base-url';
import { getAccessToken, getUserDetails } from '@/constants/token-access';
import { Course } from '@/constants/models';
import Chip from '@/components/Chip';
import { getImage } from '@/helpers/image';
import SprinterButton from '@/components/SprinterButton';
import SprinterTextInput from '@/components/SprinterTextInput';
import Toast from 'react-native-toast-message';
import baseTheme from '@/constants/base-theme';

export default function UploadScreen() {
  const { theme } = useTheme();
  const colorScheme = useColorScheme();

  const [questionImage, setQuestionImage] = useState<string>('');
  const [markSchemeImage, setMarkSchemeImage] = useState<string>('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string>('');

  const [courses, setCourses] = useState<Array<Course>>([]);

  const [course, setCourse] = useState<Course>();
  const [totalMarks, setTotalMarks] = useState<number>(1);

  const styles = StyleSheet.create({
    container: {
      gap: 32,
      padding: 16,
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.background
          : baseTheme.dark.background,
    },
    imageSelectorContainer: {
      flexDirection: 'row',
      height: 240,
      gap: 16,
    },
    imageSelector: {
      flex: 1,
      borderRadius: 16,
      alignItems: 'center',
      gap: 8,
    },
    imageSelectorText: {
      textAlign: 'center',
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
    },
    imageSelectorLabel: {
      justifyContent: 'center',
      height: 40,
    },
    image: {
      borderRadius: 16,
      backgroundColor: 'white',
      flex: 1,
      width: '100%',
      justifyContent: 'center',
    },
    section: {
      gap: 8,
    },
    text: {
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
    },
  });

  useEffect(() => {
    getCourses();
  }, []);

  async function getCourses() {
    const response = await fetch(`${baseUrl}/courses/`);
    const json = await response.json();
    setCourses(json);
  }

  async function pickQuestionImage() {
    const image = await getImage();
    if (!image) return;
    setQuestionImage(image);
  }

  async function pickMarkschemeImage() {
    const image = await getImage();
    if (!image) return;
    setMarkSchemeImage(image);
  }

  async function submit() {
    if (!questionImage || !markSchemeImage) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Question and mark scheme images not provided',
      });
      return;
    }

    if (!title) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Title not given',
      });
      return;
    }

    if (!course) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Course information not given',
      });
      return;
    }

    const accessToken = await getAccessToken();

    if (!accessToken) return;

    const user = await getUserDetails();

    if (!user) return;

    const question = {
      question: questionImage,
      markScheme: markSchemeImage,
      title,
      description,
      course: course._id,
      totalMarks,
      author: user.id,
    };

    const response = await fetch(`${baseUrl}/questions/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(question),
    });

    if (response.status !== 201) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong. Please try again later',
      });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Successfully uploaded question',
    });
    setQuestionImage('');
    setMarkSchemeImage('');
    setTitle('');
    setDescription('');
    setCourse(undefined);
    setTotalMarks(1);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageSelectorContainer}>
        <Pressable style={styles.imageSelector} onPress={pickQuestionImage}>
          <View style={styles.imageSelectorLabel}>
            <Text style={styles.imageSelectorText}>Select Question Image</Text>
          </View>

          <ImageBackground
            style={styles.image}
            source={{ uri: questionImage }}
            contentFit="contain"
          >
            {questionImage || (
              <Icon name="add" type="material" color="black" size={32} />
            )}
          </ImageBackground>
        </Pressable>

        <Pressable style={styles.imageSelector} onPress={pickMarkschemeImage}>
          <View style={styles.imageSelectorLabel}>
            <Text style={styles.imageSelectorText}>
              Select Mark Scheme Image
            </Text>
          </View>

          <ImageBackground
            style={styles.image}
            source={{ uri: markSchemeImage }}
            contentFit="contain"
          >
            {markSchemeImage || (
              <Icon name="add" type="material" color="black" size={32} />
            )}
          </ImageBackground>
        </Pressable>
      </View>
      <SprinterTextInput
        label="Title"
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <SprinterTextInput
        label="Description"
        multiline
        placeholder="Description"
        numberOfLines={8}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <View style={styles.section}>
        <Text style={styles.text}>
          Course: {course?.qualification || ''} {course?.examBoard || ''}{' '}
          {course?.name || ''}
        </Text>

        <FlatList
          style={{ paddingVertical: 4 }}
          data={courses}
          contentContainerStyle={styles.section}
          horizontal
          renderItem={({ item }) => {
            const title = `${item.qualification} ${item.examBoard} ${item.name}`;
            return <Chip title={title} onPress={() => setCourse(item)} />;
          }}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Number of Marks: {totalMarks}</Text>
        <Slider
          style={{ height: 40 }}
          minimumValue={1}
          maximumValue={20}
          step={1}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.grey0}
          thumbTintColor={theme.colors.primary}
          onValueChange={(mark) => setTotalMarks(mark)}
        />
      </View>
      <SprinterButton title="Submit" onPress={submit} />
    </ScrollView>
  );
}
