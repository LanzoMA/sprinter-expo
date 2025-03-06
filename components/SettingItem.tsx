import { useColorScheme } from 'react-native';
import { Icon, ListItem } from '@rneui/themed';
import baseTheme from '@/constants/base-theme';

interface SettingItemProps {
  iconName: string;
  title: string;
  onPress?: () => void;
}

export default function SettingItem({
  iconName,
  title,
  onPress,
}: SettingItemProps) {
  const colorScheme = useColorScheme();

  return (
    <ListItem
      containerStyle={{ backgroundColor: 'transparent' }}
      onPress={onPress}
    >
      <Icon
        name={iconName}
        type="material"
        size={32}
        color={
          colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text
        }
      />
      <ListItem.Content>
        <ListItem.Title
          style={{
            color:
              colorScheme === 'light'
                ? baseTheme.light.text
                : baseTheme.dark.text,
          }}
        >
          {title}
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron size={32} />
    </ListItem>
  );
}
