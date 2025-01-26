import { View } from 'react-native';
import { Text, useTheme } from '@rneui/themed';
import { ReactNode } from 'react';

interface SubjectCardProps {
  title: string;
  children?: ReactNode;
}

const SubjectCard = (props: SubjectCardProps) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.grey0,
        padding: 8,
        borderRadius: 4,
        gap: 8,
      }}
    >
      <Text>{props.title}</Text>
      {props.children}
    </View>
  );
};

export default SubjectCard;
