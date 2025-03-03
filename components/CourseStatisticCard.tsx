import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import baseTheme from '@/constants/base-theme';

interface CourseStatisticCardProps {
  course: string;
  percentage: number;
}

export default function CourseStatisticCard({
  course,
  percentage,
}: CourseStatisticCardProps) {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor:
        colorScheme === 'light'
          ? baseTheme.light.surface
          : baseTheme.dark.surface,
      padding: 8,
      paddingLeft: 16,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
      fontWeight: 700,
    },
    course: {
      fontSize: 20,
      flex: 1,
    },
    percentage: {
      backgroundColor:
        percentage > 0.8
          ? baseTheme.common.green
          : percentage > 0.6
          ? baseTheme.common.orange
          : baseTheme.common.red,
      padding: 8,
      borderRadius: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.course]}>{course}</Text>
      <View style={styles.percentage}>
        <Text style={styles.text}>{Math.round(percentage * 100)}%</Text>
      </View>
    </View>
  );
}
