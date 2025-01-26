import { View } from 'react-native';
import { router } from 'expo-router';
import { useTheme, Text, SearchBar } from '@rneui/themed';
import SubjectCard from '@/components/SubjectCard';

export default function SearchScreen() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        padding: 16,
        gap: 16,
      }}
    >
      <SearchBar
        onPress={() => {
          router.push('/(search)/search');
        }}
      />
      <Text style={{ fontWeight: 700, fontSize: 22 }}>Your Courses</Text>
      <SubjectCard
        title="Maths"
        qualification="A Level"
        examBoard="Edexcel"
        color="#E87B16"
      />
      <SubjectCard
        title="Further Maths"
        qualification="A Level"
        examBoard="Edexcel"
        color="#2FCA22"
      />
      <SubjectCard
        title="Physics"
        qualification="A Level"
        examBoard="OCR"
        color="#18A8D6"
      />
    </View>
  );
}
