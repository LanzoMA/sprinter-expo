import { ScrollView, TextInput, View, useColorScheme } from 'react-native';
import { useState } from 'react';
import { useTheme, Text } from '@rneui/themed';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BouncyCheckboxGroup, {
  CheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import SearchCard from '@/components/SearchCard';
import SprinterSearchBar from '@/components/SprinterSearchBar';
import { router } from 'expo-router';
import baseTheme from '@/constants/base-theme';

const SearchScreen = () => {
  const { theme } = useTheme();
  const colorScheme = useColorScheme();

  const [easyChecked, setEasyChecked] = useState<boolean>(false);
  const [okayChecked, setOkayChecked] = useState<boolean>(false);
  const [mediumChecked, setMediumChecked] = useState<boolean>(false);
  const [hardChecked, setHardChecked] = useState<boolean>(false);

  const [minMarks, setMinMarks] = useState<string>('1');
  const [maxMarks, setMaxMarks] = useState<string>('20');

  const sorts: CheckboxButton[] = [
    {
      id: '0',
      text: 'Most Popular',
      textStyle: {
        color: theme.colors.text,
        textDecorationLine: 'none',
      },
      fillColor: theme.colors.primary,
      iconStyle: { borderWidth: 1, borderColor: theme.colors.primary },
    },
    {
      id: '1',
      text: 'Most Favorites',
      textStyle: {
        color: theme.colors.text,
        textDecorationLine: 'none',
      },
      fillColor: theme.colors.primary,
      iconStyle: { borderWidth: 1, borderColor: theme.colors.primary },
    },
    {
      id: '2',
      text: 'Most Difficult',
      textStyle: {
        color: theme.colors.text,
        textDecorationLine: 'none',
      },
      fillColor: theme.colors.primary,
      iconStyle: { borderWidth: 1, borderColor: theme.colors.primary },
    },
    {
      id: '3',
      text: 'Least Difficult',
      textStyle: {
        color: theme.colors.text,
        textDecorationLine: 'none',
      },
      fillColor: theme.colors.primary,
      iconStyle: { borderWidth: 1, borderColor: theme.colors.primary },
    },
    {
      id: '4',
      text: 'Most Marks',
      textStyle: {
        color: theme.colors.text,
        textDecorationLine: 'none',
      },
      fillColor: theme.colors.primary,
      iconStyle: { borderWidth: 1, borderColor: theme.colors.primary },
    },
    {
      id: '5',
      text: 'Least Marks',
      textStyle: {
        color: theme.colors.text,
        textDecorationLine: 'none',
      },
      fillColor: theme.colors.primary,
      iconStyle: { borderWidth: 1, borderColor: theme.colors.primary },
    },
  ];

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
          router.push(
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

      {/* <SearchCard title="Difficulty">
        <View style={{ gap: 16, paddingBottom: 8 }}>
          <View style={{ flexDirection: 'row' }}>
            <BouncyCheckbox
              fillColor={theme.colors.primary}
              isChecked={easyChecked}
              onPress={(checked) => setEasyChecked(checked)}
            />
            <Text>Easy</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <BouncyCheckbox
              fillColor={theme.colors.primary}
              isChecked={okayChecked}
              onPress={(checked) => setOkayChecked(checked)}
            />
            <Text>Okay</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <BouncyCheckbox
              fillColor={theme.colors.primary}
              isChecked={mediumChecked}
              onPress={(checked) => setMediumChecked(checked)}
            />
            <Text>Medium</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <BouncyCheckbox
              fillColor={theme.colors.primary}
              isChecked={hardChecked}
              onPress={(checked) => setHardChecked(checked)}
            />
            <Text>Hard</Text>
          </View>
        </View>
      </SearchCard> */}

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

      {/* <SearchCard title="Sort By">
          <BouncyCheckboxGroup
            data={sorts}
            onChange={() => {}}
            style={{ flexDirection: 'column', gap: 8 }}
          />
        </SearchCard> */}
    </ScrollView>
  );
};

export default SearchScreen;
