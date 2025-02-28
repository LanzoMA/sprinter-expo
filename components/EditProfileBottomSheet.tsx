import { View, Pressable } from 'react-native';
import { useState } from 'react';
import { Image } from 'expo-image';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useTheme, Text, Input } from '@rneui/themed';
import SprinterTextInput from './SprinterTextInput';

interface EditProfileBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  username: string;
}

export default function EditProfileBottomSheet({
  bottomSheetRef,
  username,
}: EditProfileBottomSheetProps) {
  const { theme } = useTheme();
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [userDescriptionInput, setUserDescriptionInput] = useState<string>('');

  function handleCancel() {
    bottomSheetRef.current?.close();
    setUsernameInput(username);
    setUserDescriptionInput('');
  }

  async function updateProfile() {}

  return (
    <BottomSheet
      backgroundStyle={{ backgroundColor: theme.colors.surfaceDark }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
      enablePanDownToClose
      index={-1}
      ref={bottomSheetRef}
    >
      <BottomSheetView style={{ alignItems: 'center', gap: 8, padding: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Pressable onPress={handleCancel}>
            <Text>Cancel</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              updateProfile();
              bottomSheetRef.current?.close();
            }}
          >
            <Text style={{ color: theme.colors.primary, fontWeight: 700 }}>
              Save
            </Text>
          </Pressable>
        </View>

        <Image
          style={{
            width: 128,
            height: 128,
            borderRadius: 1024,
            paddingVertical: 64,
          }}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
          }}
        />

        <SprinterTextInput
          label="Username"
          defaultValue={username}
          value={usernameInput}
          onChangeText={(text) => setUsernameInput(text)}
        />

        <SprinterTextInput
          label="User Description"
          value={userDescriptionInput}
          onChangeText={(text) => setUserDescriptionInput(text)}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}
