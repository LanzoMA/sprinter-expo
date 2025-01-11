import { ImageBackground } from 'expo-image';
import { View, Pressable, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Chip, useTheme, Button, Text, Icon } from '@rneui/themed';
import Slider from '@react-native-community/slider';
import { baseUrl } from '@/constants/base-url';

interface Course {
  name: string;
  qualification: string;
  examBoard: string;
}

export default function UploadScreen() {
  const { theme } = useTheme();

  const [questionImage, setQuestionImage] = useState('');
  const [markschemeImage, setMarkschemeImage] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [courses, setCourses] = useState<Array<Course>>([]);

  const [course, setCourse] = useState('');
  const [marks, setMarks] = useState(5);

  useEffect(() => { getCourses() }, []);

  async function getCourses() {
    const response = await fetch(`${baseUrl}/courses/`);
    const json = await response.json();

    setCourses(json);
  }

  async function pickQuestionImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
    });

    if (!result.canceled) {
      setQuestionImage(result.assets[0].uri);
    }
  }

  async function pickMarkschemeImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
    });

    if (!result.canceled) {
      setMarkschemeImage(result.assets[0].uri);
    }
  }

  function submit() {
    console.log({
      questionImage,
      markschemeImage,
      title,
      description,
      course,
      marks,
    });
  }

  return (
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
            source={questionImage}
            contentFit='contain'
          >
            <Icon
              name='add'
              type='material'
              color='black'
              size={32}
            />
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
            source={markschemeImage}
            contentFit='contain'
          >
            {
              markschemeImage ? null : <Icon
                name='add'
                type='material'
                color='black'
                size={32}
              />
            }
          </ImageBackground>
        </Pressable>
      </View>

      <Text>Title</Text>

      <TextInput
        style={{ color: 'white' }}
        placeholder='Title'
        placeholderTextColor='gray'
        onChangeText={(title) => { setTitle(title); }}
      />

      <Text>Description</Text>

      <TextInput
        multiline
        style={{ color: 'white' }}
        placeholder='Description'
        placeholderTextColor='gray'
        numberOfLines={4}
        onChangeText={(description) => { setDescription(description); }}
      />

      <Text>Course: {course}</Text>

      <FlatList
        style={{ paddingVertical: 16, flexWrap: 'wrap' }}
        data={courses}
        renderItem={
          (course) => {
            const { name, qualification, examBoard } = course.item;
            const title = `${qualification} ${examBoard} ${name}`;

            return (
              <Chip
                containerStyle={{
                  marginRight: 16,
                }}
                title={title}
                onPress={() => { setCourse(title); }}
              />
            )
          }
        }
        horizontal={true}
      />

      <Text>Number of Marks: {marks}</Text>

      <Slider
        style={{ height: 40 }}
        minimumValue={1}
        maximumValue={20}
        step={1}
        minimumTrackTintColor={theme.colors.primary}
        maximumTrackTintColor={theme.colors.grey0}
        thumbTintColor={theme.colors.primary}
        onValueChange={(mark) => { setMarks(mark) }}
      />

      <Button title='Submit' onPress={submit} />
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 16,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  }
});