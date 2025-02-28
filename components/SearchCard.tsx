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
        backgroundColor: theme.colors.surface,
        padding: 8,
        borderRadius: 8,
        gap: 16,
      }}
    >
      <Text style={{ fontWeight: 700 }}>{props.title}</Text>
      {props.children}
    </View>
  );
};

export default SubjectCard;
