import { Icon, ListItem } from '@rneui/themed';

interface SubjectCardProps {
  title: string;
  qualification: string;
  examBoard: string;
  color: string;
}

const SubjectCard = (props: SubjectCardProps) => {
  return (
    <ListItem
      containerStyle={{ backgroundColor: props.color, borderRadius: 8 }}
    >
      <Icon name="library-books" size={40} />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: 700, fontSize: 18 }}>
          {props.title}
        </ListItem.Title>
        <ListItem.Subtitle style={{ gap: 8 }}>
          {props.qualification} | {props.examBoard}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron size={32} />
    </ListItem>
  );
};

export default SubjectCard;
