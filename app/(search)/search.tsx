import { ScrollView, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useTheme, Text } from '@rneui/themed';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BouncyCheckboxGroup, {
  CheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import SearchCard from '@/components/SearchCard';
import SprinterSearchBar from '@/components/SprinterSearchBar';

const SearchScreen = () => {
  const { theme } = useTheme();

  const [easyChecked, setEasyChecked] = useState<boolean>(false);
  const [okayChecked, setOkayChecked] = useState<boolean>(false);
  const [mediumChecked, setMediumChecked] = useState<boolean>(false);
  const [hardChecked, setHardChecked] = useState<boolean>(false);

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
        backgroundColor: theme.colors.background,
        padding: 8,
      }}
      contentContainerStyle={{ gap: 16 }}
    >
      <SprinterSearchBar autoFocus />

      <SearchCard title="Difficulty">
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
            defaultValue="1"
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
            defaultValue="20"
          />
        </View>
      </SearchCard>

      <SearchCard title="Sort By">
        <BouncyCheckboxGroup
          data={sorts}
          onChange={() => {}}
          style={{ flexDirection: 'column', gap: 8 }}
        />
      </SearchCard>
    </ScrollView>
  );
};

export default SearchScreen;
