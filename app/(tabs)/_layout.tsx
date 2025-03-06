import { useColorScheme } from 'react-native';
import { Tabs } from 'expo-router';
import { Icon, useTheme } from '@rneui/themed';
import baseTheme from '@/constants/base-theme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: {
          height: 60,
          backgroundColor:
            colorScheme === 'light'
              ? baseTheme.light.background
              : baseTheme.dark.background,
          alignItems: 'center',
          paddingTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="home" type="material" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="explore" type="material" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: 'Upload',
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="add-circle" type="material" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="folder" type="material" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Me',
          tabBarIcon: ({ color }) => (
            <Icon
              size={28}
              name="account-circle"
              type="material"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
