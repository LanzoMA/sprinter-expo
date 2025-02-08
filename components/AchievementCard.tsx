import { ListItem, useTheme } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';

interface AchievementCardProps {
  name: string;
  description: string;
}

const AchievementCard = (props: AchievementCardProps) => {
  const { theme } = useTheme();

  return (
    <ListItem
      containerStyle={{ backgroundColor: theme.colors.grey0, borderRadius: 16 }}
    >
      <Ionicons name="trophy" size={32} color="#FDE82B" />
      <ListItem.Content>
        <ListItem.Title style={{ fontSize: 18, fontWeight: 700 }}>
          {props.name}
        </ListItem.Title>
        <ListItem.Subtitle>{props.description}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default AchievementCard;
