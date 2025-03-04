import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import { ReactNode } from 'react';
import { Image } from 'expo-image';
import baseTheme from '@/constants/base-theme';
import { baseProfilePicture } from '@/constants/base-profile-picture';

interface ProfileHeaderProps {
  username: string;
  description?: string;
  profilePicture?: string;
  children?: ReactNode;
}

export default function ProfileHeader({
  username,
  description = '',
  profilePicture,
  children,
}: ProfileHeaderProps) {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 16,
      paddingVertical: 4,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 1024,
    },
    details: {
      flex: 1,
      gap: 12,
      justifyContent: 'center',
    },
    username: {
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
      fontWeight: 700,
      fontSize: 16,
    },
    description: {
      color:
        colorScheme === 'light' ? baseTheme.light.text : baseTheme.dark.text,
      fontSize: 12,
    },
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: profilePicture || baseProfilePicture,
        }}
      />

      <View style={styles.details}>
        <Text style={styles.username}>@{username}</Text>
        <Text style={styles.description}>{description || 'No bio yet'}</Text>
        {children}
      </View>
    </View>
  );
}
