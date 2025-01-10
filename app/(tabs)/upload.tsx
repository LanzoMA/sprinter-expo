import { Image } from 'expo-image';
import { View, Text, Pressable, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Chip, useTheme, Button, Slider } from '@rneui/themed';
import { defaultStyles } from '@/constants/default-styles';

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
  const [marks, setMarks] = useState(1);

  useEffect(() => { getCourses() }, []);

  async function getCourses() {
    const response = await fetch('http://192.168.1.160:5000/courses/');
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
          style={{ flex: 1 }}
          onPress={pickQuestionImage}
        >
          <Image
            style={styles.image}
            source={questionImage}
            contentFit='contain'
          />
        </Pressable>
        <Pressable
          style={{ flex: 1 }}
          onPress={pickMarkschemeImage}
        >
          <Image
            style={styles.image}
            source={markschemeImage}
            contentFit='contain'
          />
        </Pressable>
      </View>

      <Text style={defaultStyles.text}>Title</Text>

      <TextInput
        style={{ color: 'white' }}
        placeholder='Title'
        placeholderTextColor='gray'
        onChangeText={(title) => { setTitle(title); }}
      />

      <Text style={defaultStyles.text}>Description</Text>

      <TextInput
        multiline
        style={{ color: 'white' }}
        placeholder='Description'
        placeholderTextColor='gray'
        numberOfLines={4}
        onChangeText={(description) => { setDescription(description); }}
      />

      <Text style={defaultStyles.text}>Course: {course}</Text>

      <FlatList
        style={{ paddingVertical: 16 }}
        data={courses}
        renderItem={
          (course) => {
            const { name, qualification, examBoard } = course.item;
            const title = `${name} ${qualification} ${examBoard}`;

            return (
              <Chip
                title={title}
                onPress={() => { setCourse(title); }}
              />
            )
          }
        }
        horizontal={true}
      />

      <Text style={defaultStyles.text}>Number of Marks: {marks}</Text>

      <Slider
        minimumValue={1}
        maximumValue={20}
        step={1}
        thumbStyle={{
          height: 24,
          width: 24,
          backgroundColor: theme.colors.primary
        }}
        minimumTrackTintColor={theme.colors.primary}
        onValueChange={(mark) => { setMarks(mark) }}
      />

      <Button title='Submit' onPress={submit} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 16,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  }
});