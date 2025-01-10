import { Image } from 'expo-image';
import { View, Text, Button, Pressable, StyleSheet, useColorScheme, TextInput, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { darkTheme, lightTheme } from '@/constants/themes';
import { defaultStyles } from '@/constants/default-styles';

export default function UploadScreen() {
  let colorscheme = useColorScheme();

  const [questionImage, setQuestionImage] = useState('');
  const [markschemeImage, setMarkschemeImage] = useState('');

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

  return (
    <View
      style={{
        gap: 8,
        paddingTop: 32,
        padding: 16,
        backgroundColor: colorscheme == 'light' ? lightTheme.backgroundColor : darkTheme.backgroundColor,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          height: 350,
          gap: 16,
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

      <TextInput
        placeholder='Title'
        placeholderTextColor='white'
      />

      <TextInput
        placeholder='Description'
        placeholderTextColor='white'
      />

      <Text style={defaultStyles.text}>Course</Text>

      <FlatList
        data={
          [
            {
              name: 'Maths',
              qualification: 'A Level',
              examBoard: 'Edexcel',
            },
            {
              name: 'Further Maths',
              qualification: 'A Level',
              examBoard: 'Edexcel',
            },
            {
              name: 'Physics',
              qualification: 'A Level',
              examBoard: 'OCR',
            },
          ]
        }

        renderItem={
          (course) => {
            const { name, qualification, examBoard } = course.item;
            return <Text style={defaultStyles.text}>{`${qualification} ${examBoard} ${name}`}</Text>
          }
        }
      />

      <Text style={defaultStyles.text}>Number of Marks</Text>

      <Button title='Submit' />
    </View>
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