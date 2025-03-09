import { ScrollView, TextInput, View, useColorScheme } from 'react-native';
import { useState } from 'react';
import { useTheme, Text } from '@rneui/themed';
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group';
import SearchCard from '@/components/SearchCard';
import SprinterSearchBar from '@/components/SprinterSearchBar';
import { router } from 'expo-router';
import baseTheme from '@/constants/base-theme';

const SearchScreen = () => {
  const { theme } = useTheme();
  const colorScheme = useColorScheme();

  const difficulties = ['Easy', 'Okay', 'Medium', 'Hard'];
  const [difficulty, setDifficulty] = useState<string>('');
  const [minMarks, setMinMarks] = useState<string>('1');
  const [maxMarks, setMaxMarks] = useState<string>('20');

  return (
    <ScrollView
      style={{
        backgroundColor:
          colorScheme === 'light'
            ? baseTheme.light.background
            : baseTheme.dark.background,
        padding: 8,
      }}
      contentContainerStyle={{ gap: 16 }}
    >
      <SprinterSearchBar
        autoFocus
        onSubmitEditing={() =>
          difficulty
            ? router.push(
                `/(search)/results?minMarks=${minMarks}&maxMarks=${maxMarks}&difficulty=${difficulty}`
              )
            : router.push(
                `/(search)/results?minMarks=${minMarks}&maxMarks=${maxMarks}`
              )
        }
      />

      <Text
        style={{
          color:
            colorScheme === 'light'
              ? baseTheme.light.text
              : baseTheme.dark.text,
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        Filters
      </Text>

      <SearchCard title="Difficulty">
        <BouncyCheckboxGroup
          data={difficulties.map((difficulty, index) => {
            return {
              id: index.toString(),
              text: difficulty,
              textStyle: {
                color: theme.colors.text,
                textDecorationLine: 'none',
              },
              fillColor: theme.colors.primary,
              iconStyle: { borderWidth: 1, borderColor: theme.colors.primary },
            };
          })}
          onChange={(difficulty) => {
            setDifficulty(difficulty.id as string);
          }}
          style={{ flexDirection: 'column', gap: 16 }}
        />
      </SearchCard>

      <SearchCard title="Marks">
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 1 }}>Minimum Marks</Text>
          <TextInput
            style={{
              color: theme.colors.text,
              backgroundColor: theme.colors.surfaceBright,
              width: 40,
              textAlign: 'center',
              borderRadius: 8,
            }}
            keyboardType="numeric"
            maxLength={2}
            value={minMarks}
            onChangeText={(text) => setMinMarks(text)}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 1 }}>Maximum Marks</Text>
          <TextInput
            style={{
              color: theme.colors.text,
              backgroundColor: theme.colors.surfaceBright,
              width: 40,
              textAlign: 'center',
              borderRadius: 8,
            }}
            keyboardType="numeric"
            maxLength={2}
            value={maxMarks}
            onChangeText={(text) => setMaxMarks(text)}
          />
        </View>
      </SearchCard>
    </ScrollView>
  );
};

export default SearchScreen;
