import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export async function getImage(): Promise<string | undefined> {
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
