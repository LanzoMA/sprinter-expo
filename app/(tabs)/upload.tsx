import { Image } from 'expo-image';
import { View, Text, Button, Pressable, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function UploadScreen() {
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
        padding: 8,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          height: 350,
          gap: 8,
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

      <Text>Number of Marks</Text>

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