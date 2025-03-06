import { View, Pressable, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useTheme, Text } from '@rneui/themed';
import SprinterTextInput from './SprinterTextInput';
import { baseProfilePicture } from '@/constants/base-profile-picture';
import { baseUrl } from '@/constants/base-url';
import {
  getAccessToken,
  getUserDetails,
  storeAccessToken,
} from '@/constants/token-access';
import { getImage } from '@/helpers/image';

interface EditProfileBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  username: string;
  description: string;
  profilePicture: string;
}

export default function EditProfileBottomSheet({
  bottomSheetRef,
  username,
  description,
  profilePicture,
}: EditProfileBottomSheetProps) {
  const { theme } = useTheme();

  const [usernameInput, setUsernameInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');
  const [profilePictureInput, setProfilePictureInput] = useState<string>('');

  const styles = StyleSheet.create({
    image: {
      width: 128,
      height: 128,
      borderRadius: 1024,
      paddingVertical: 64,
    },
    options: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    save: {
      color: theme.colors.primary,
      fontWeight: 700,
    },
  });

  useEffect(() => {
    setUsernameInput(username);
    setDescriptionInput(description);
  }, []);

  async function handleProfilePicture() {
    const image = await getImage();

    if (!image) return;

    setProfilePictureInput(image);
  }

  function handleCancel() {
    bottomSheetRef.current?.close();
    setUsernameInput(username);
    setDescriptionInput(description);
    setProfilePictureInput(profilePicture);
  }

  async function handleSave() {
    await updateProfile();
    bottomSheetRef.current?.close();
  }

  async function updateProfile() {
    const profile = {
      username: usernameInput || username,
      description: descriptionInput || description,
      profilePicture: profilePictureInput || profilePicture,
    };

    const user = await getUserDetails();

    if (!user) return;

    const accessToken = await getAccessToken();

    if (!accessToken) return;

    const response = await fetch(`${baseUrl}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(profile),
    });

    const data = await response.json();

    await storeAccessToken(data.accessToken);
  }

  return (
    <BottomSheet
      backgroundStyle={{ backgroundColor: theme.colors.surfaceDark }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
      enablePanDownToClose
      index={-1}
      ref={bottomSheetRef}
    >
      <BottomSheetView style={{ alignItems: 'center', gap: 8, padding: 16 }}>
        <View style={styles.options}>
          <Pressable onPress={handleCancel}>
            <Text>Cancel</Text>
          </Pressable>

          <Pressable onPress={handleSave}>
            <Text style={styles.save}>Save</Text>
          </Pressable>
        </View>

        <Pressable onPress={handleProfilePicture}>
          <Image
            style={styles.image}
            source={{
              uri: profilePictureInput || profilePicture || baseProfilePicture,
            }}
          />
        </Pressable>

        <SprinterTextInput
          label="Username"
          defaultValue={username}
          value={usernameInput}
          onChangeText={(text) => setUsernameInput(text)}
        />

        <SprinterTextInput
          label="User Description"
          defaultValue={description}
          value={descriptionInput}
          onChangeText={(text) => setDescriptionInput(text)}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}
