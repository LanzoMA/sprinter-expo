import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          height: 60,
          backgroundColor: 'black',
          paddingTop: 4,
        }
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='home' color={color} />
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='search' color={color} />
        }}
      />
      <Tabs.Screen
        name='upload'
        options={{
          title: 'Upload',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='upload' color={color} />
        }}
      />
      <Tabs.Screen
        name='saved'
        options={{
          title: 'Saved',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='folder' color={color} />
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Me',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='user' color={color} />
        }}
      />
    </Tabs>
  )
}