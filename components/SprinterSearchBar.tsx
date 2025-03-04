import { View, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@rneui/themed';

interface SprinterSearchBarProps {
  editable?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  onSubmitEditing?: () => void;
}

export default function SprinterSearchBar({
  editable,
  placeholder,
  autoFocus,
  onSubmitEditing,
}: SprinterSearchBarProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 8,
      }}
    >
      <TextInput
        style={{ flex: 1, color: 'white' }}
        editable={editable}
        placeholder={placeholder}
        placeholderTextColor="white"
        autoFocus={autoFocus}
        onSubmitEditing={onSubmitEditing}
      />
      <MaterialIcons name="search" size={20} color="white" />
    </View>
  );
}
