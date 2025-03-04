import { ImageBackground } from 'expo-image';
import {
  View,
  Pressable,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useTheme, Button, Text, Icon, Input } from '@rneui/themed';
import Slider from '@react-native-community/slider';
import { baseUrl } from '@/constants/base-url';
import { Snackbar } from 'react-native-paper';
import { getAccessToken, getUserDetails } from '@/constants/token-access';
import { Course } from '@/constants/models';
import Chip from '@/components/Chip';
import { getImage } from '@/helpers/image';

export default function UploadScreen() {
  const { theme } = useTheme();

  const [questionImage, setQuestionImage] = useState<string>('');
  const [markSchemeImage, setMarkSchemeImage] = useState<string>('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string>('');

  const [courses, setCourses] = useState<Array<Course>>([]);

  const [course, setCourse] = useState<Course>();
  const [totalMarks, setTotalMarks] = useState<number>(1);

  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

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

    if (!image) {
      setMessage('Image not found');
      setVisible(true);
      return;
    }

    setQuestionImage(image);
  }

  async function pickMarkschemeImage() {
    const image = await getImage();

    if (!image) {
      setMessage('Image not found');
      setVisible(true);
      return;
    }

    setMarkSchemeImage(image);
  }

  async function submit() {
    if (!questionImage || !markSchemeImage) {
      setMessage('Missing question and mark scheme images');
      setVisible(true);
      return;
    }

    if (!title) {
      setMessage('Title was not given');
      setVisible(true);
      return;
    }

    if (!course) {
      setMessage('Missing course information');
      setVisible(true);
      return;
    }

    if (!totalMarks) {
      setMessage('Missing total marks information');
      setVisible(true);
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
      setMessage(
        'An error occurred while uploading the question. Please try again later.'
      );
      setVisible(true);
      return;
    }

    setMessage('Successfully uploaded the question!');
    setVisible(true);
    setQuestionImage('');
    setMarkSchemeImage('');
    setTitle('');
    setDescription('');
    setCourse(undefined);
    setTotalMarks(1);
  }

  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          gap: 8,
          padding: 16,
          backgroundColor: theme.colors.background,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            height: 380,
            gap: 16,
            paddingVertical: 16,
          }}
        >
          <Pressable
            style={{
              flex: 1,
              borderWidth: 2,
              borderRadius: 16,
            }}
            onPress={pickQuestionImage}
          >
            <ImageBackground
              style={styles.image}
              source={{ uri: questionImage }}
              contentFit="contain"
            >
              {questionImage ? null : (
                <Icon name="add" type="material" color="black" size={32} />
              )}
            </ImageBackground>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              borderWidth: 2,
              borderRadius: 16,
            }}
            onPress={pickMarkschemeImage}
          >
            <ImageBackground
              style={styles.image}
              source={{ uri: markSchemeImage }}
              contentFit="contain"
            >
              {markSchemeImage ? null : (
                <Icon name="add" type="material" color="black" size={32} />
              )}
            </ImageBackground>
          </Pressable>
        </View>

        <Text>Title</Text>

        <Input
          placeholder="Title"
          onChangeText={(title) => {
            setTitle(title);
          }}
        />

        <Text>Description</Text>

        <Input
          style={{ minHeight: 80 }}
          multiline
          placeholder="Description"
          numberOfLines={8}
          onChangeText={(description) => {
            setDescription(description);
          }}
        />

        <Text>
          Course: {course?.qualification} {course?.examBoard} {course?.name}
        </Text>

        <FlatList
          style={{ paddingVertical: 4 }}
          data={courses}
          contentContainerStyle={{ gap: 8 }}
          renderItem={(course) => {
            const { name, qualification, examBoard } = course.item;
            const title = `${qualification} ${examBoard} ${name}`;

            return (
              <Chip
                title={title}
                onPress={() => {
                  setCourse(course.item);
                }}
              />
            );
          }}
          horizontal
        />

        <Text>Number of Marks: {totalMarks}</Text>

        <Slider
          style={{ height: 40 }}
          minimumValue={1}
          maximumValue={20}
          step={1}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.grey0}
          thumbTintColor={theme.colors.primary}
          onValueChange={(mark) => {
            setTotalMarks(mark);
          }}
        />

        <Button title="Submit" onPress={submit} />
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        duration={3000}
      >
        <Text>{message}</Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 16,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
});
