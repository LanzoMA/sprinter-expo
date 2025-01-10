import { Tab, TabView, useTheme, Text, Button, Image, Icon } from '@rneui/themed';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export default function ProfileScreen() {
  const { theme } = useTheme();

  const [tabIndex, setTabIndex] = useState(0);

  function goToSettings() {
    router.push('/settings');
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={{ padding: 8 }}>
        <View style={{ flexDirection: 'row' }} >
          <View style={{ flex: 1 }} />
          <Icon
            name='settings'
            type='material'
            size={24}
            color={theme.colors.white}
            style={{
              padding: 8,
            }}
            onPress={goToSettings}
          />
        </View>

        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            source={{ uri: 'https://avatar.iran.liara.run/public/50' }}
          />

          <View style={{ flex: 1, gap: 8 }}>
            <Text>@danielbrown</Text>
            <Text>Hi, I'm currently a year 13 studying Maths, Further Maths and Physics.</Text>
            <Button
              buttonStyle={{
                backgroundColor: theme.colors.grey0,
              }}
            >Edit Profile</Button>
          </View>
        </View>
      </View>

      <Tab
        value={tabIndex}
        onChange={(tabIndex) => setTabIndex(tabIndex)}

        buttonStyle={{
          height: 60,
          backgroundColor: theme.colors.background,
        }}

        indicatorStyle={{
          backgroundColor: theme.colors.white,
        }}

        variant='primary'
      >
        <Tab.Item
          icon={{
            name: 'photo-library',
            type: 'material',
            color: theme.colors.white
          }}
        />
        <Tab.Item
          icon={{
            name: 'bar-chart',
            type: 'material',
            color: theme.colors.white
          }}
        />
        <Tab.Item
          icon={{
            name: 'trophy',
            type: 'ionicon',
            color: theme.colors.white
          }}
        />
      </Tab>

      <TabView
        value={tabIndex}
        onChange={setTabIndex}
      >
        <TabView.Item
          style={{
            backgroundColor: theme.colors.background,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ textAlign: 'center' }}>No posts yet.</Text>
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: theme.colors.background,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ textAlign: 'center' }}>No data recorded yet.</Text>
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: theme.colors.background,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ textAlign: 'center' }}>No achievements yet.</Text>
        </TabView.Item>
      </TabView>
    </View>
  )
}