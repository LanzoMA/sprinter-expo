import AchievementCard from '@/components/AchievementCard';
import { baseUrl } from '@/constants/base-url';
import { Achievement } from '@/constants/models';
import { getAccessToken, getUserDetails } from '@/constants/token-access';
import {
  Tab,
  TabView,
  useTheme,
  Text,
  Button,
  Image,
  Icon,
} from '@rneui/themed';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';

export default function ProfileScreen() {
  const { theme } = useTheme();

  const [tabIndex, setTabIndex] = useState(0);

  const [username, setUsername] = useState<string>('');

  const [achievements, setAchievements] = useState<Array<Achievement>>([]);

  useEffect(() => {
    getUsername();
    getAchievements();
  }, []);

  async function getUsername() {
    const user = await getUserDetails();

    if (!user) return;

    setUsername(user.username);
  }

  const getAchievements = async () => {
    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await fetch(`${baseUrl}/account/achievements`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      setAchievements(data.achievements);
    } catch (error) {
      console.log(error);
    }
  };

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
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }} />
          <Icon
            name="settings"
            type="material"
            size={24}
            color={theme.colors.white}
            style={{
              padding: 8,
            }}
            onPress={goToSettings}
          />
        </View>

        <View style={{ flexDirection: 'row', gap: 16, paddingVertical: 4 }}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 1024,
            }}
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
            }}
          />

          <View style={{ flex: 1, gap: 8, justifyContent: 'center' }}>
            <Text style={{ paddingVertical: 8, fontWeight: 700 }}>
              @{username}
            </Text>
            <Button
              buttonStyle={{
                backgroundColor: theme.colors.grey0,
              }}
            >
              Edit Profile
            </Button>
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
        variant="primary"
      >
        <Tab.Item
          icon={{
            name: 'photo-library',
            type: 'material',
            color: theme.colors.white,
          }}
        />
        <Tab.Item
          icon={{
            name: 'bar-chart',
            type: 'material',
            color: theme.colors.white,
          }}
        />
        <Tab.Item
          icon={{
            name: 'trophy',
            type: 'ionicon',
            color: theme.colors.white,
          }}
        />
      </Tab>

      <TabView value={tabIndex} onChange={setTabIndex}>
        <TabView.Item
          style={{
            backgroundColor: theme.colors.background,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ textAlign: 'center' }}>No posts yet.</Text>
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: theme.colors.background,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ textAlign: 'center' }}>No data recorded yet.</Text>
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: theme.colors.background,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {achievements.length > 0 ? (
            <FlatList
              style={{ width: '100%', padding: 8 }}
              data={achievements}
              contentContainerStyle={{ gap: 16 }}
              renderItem={(achievements) => {
                const { name, description } = achievements.item.achievement;

                return (
                  <AchievementCard name={name} description={description} />
                );
              }}
            />
          ) : (
            <Text style={{ textAlign: 'center' }}>No achievements yet.</Text>
          )}
        </TabView.Item>
      </TabView>
    </View>
  );
}
