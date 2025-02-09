import { View } from 'react-native';
import { Icon, ListItem } from '@rneui/themed';
import Chip from './Chip';

interface CourseCardProps {
  title: string;
  qualification: string;
  examBoard: string;
  color: string;
  chipColor: string;
}

const CourseCard = (props: CourseCardProps) => {
  return (
    <ListItem
      containerStyle={{ backgroundColor: props.color, borderRadius: 8 }}
    >
      <Icon name="library-books" size={40} />
      <ListItem.Content style={{ gap: 4 }}>
        <ListItem.Title style={{ fontWeight: 700, fontSize: 18 }}>
          {props.title}
        </ListItem.Title>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Chip title={props.qualification} color={props.chipColor} />
          <Chip title={props.examBoard} color={props.chipColor} />
        </View>
      </ListItem.Content>
      <ListItem.Chevron size={32} />
    </ListItem>
  );
};

export default CourseCard;
