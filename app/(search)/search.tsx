import { ScrollView, View } from 'react-native';
import { Button, SearchBar, useTheme } from '@rneui/themed';
import Chip from '@/components/Chip';
import SearchCard from '@/components/SearchCard';

const SearchScreen = () => {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
        padding: 8,
      }}
      contentContainerStyle={{ gap: 16 }}
    >
      <SearchBar />
      <SearchCard title="Difficulty">
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Chip title="Easy" />
          <Chip title="Okay" />
          <Chip title="Medium" />
          <Chip title="Hard" />
        </View>
      </SearchCard>
      <SearchCard title="Marks"></SearchCard>
      <SearchCard title="Sort By">
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Chip title="View Count" />
          <Chip title="Favorites" />
          <Chip title="Difficulty" />
          <Chip title="Marks" />
        </View>
      </SearchCard>
      <Button title="Search" />
    </ScrollView>
  );
};

export default SearchScreen;
