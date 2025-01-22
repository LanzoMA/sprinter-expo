import { ImageBackground } from 'expo-image';
import {
  View,
  Pressable,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import { Chip, useTheme, Button, Text, Icon, Input } from '@rneui/themed';
import Slider from '@react-native-community/slider';
import { baseUrl } from '@/constants/base-url';
import { Snackbar } from 'react-native-paper';
import { getAccessToken, getUserDetails } from '@/constants/token-access';
import { Course } from '@/constants/models';

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
  useEffect(() => {
    if (message !== '') setVisible(true);
  }, [message]);

  async function getCourses() {
    const response = await fetch(`${baseUrl}/courses/`);
    const json = await response.json();

    setCourses(json);
  }

  async function getImage(): Promise<string | undefined> {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
    });

    if (result.canceled) return;

    const imageData = await FileSystem.readAsStringAsync(result.assets[0].uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return `data:image/png;base64,${imageData}`;
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
      return;
    }

    if (!title) {
      setMessage('Title was not given');
      return;
    }

    if (!course) {
      setMessage('Missing course information');
      return;
    }

    if (!totalMarks) {
      setMessage('Missing total marks information');
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
      course,
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
      return;
    }

    setMessage('Successfully uploaded the question!');
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
          style={{ paddingVertical: 16 }}
          data={courses}
          renderItem={(course) => {
            const { name, qualification, examBoard } = course.item;
            const title = `${qualification} ${examBoard} ${name}`;

            return (
              <Chip
                containerStyle={{ marginRight: 16 }}
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
