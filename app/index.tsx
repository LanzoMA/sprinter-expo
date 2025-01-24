import { router } from 'expo-router';
import { useEffect } from 'react';
import { getAccessToken } from '@/constants/token-access';

export default function Index() {
  useEffect(() => {
    getAccessToken().then(
      // If there is an access token found, route user
      // to the home screen as they have already logged in
      (accessToken) => {
        accessToken
          ? router.replace('/(tabs)/questions/678d782d040fe3e2b27312f2')
          : router.replace('/(auth)/login');
      }
    );
  }, []);
}
