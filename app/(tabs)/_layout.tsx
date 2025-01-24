import { Tabs } from 'expo-router';
import { Icon, useTheme } from '@rneui/themed';

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: {
          height: 60,
          backgroundColor: theme.colors.background,
          alignItems: 'center',
          paddingTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="questions"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="home" type="material" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="search" type="material" color={color} />
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
