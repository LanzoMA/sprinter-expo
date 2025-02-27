import { TouchableOpacity } from 'react-native';
import { useTheme, Text } from '@rneui/themed';

interface EditProfileButton {
  onPress: () => void;
}

export default function EditProfileButton({ onPress }: EditProfileButton) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.colors.surface,
        paddingVertical: 4,
        borderRadius: 8,
      }}
      onPress={onPress}
    >
      <Text style={{ textAlign: 'center', fontWeight: 700 }}>Edit Profile</Text>
    </TouchableOpacity>
  );
}
