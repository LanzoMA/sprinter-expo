import { router } from "expo-router";
import { useEffect } from "react";
import { getAccessToken } from "@/constants/token-access";

export default function Index() {
  useEffect(() => {
    getAccessToken().then(
      // If there is an access token found, route user
      // to the home screen as they have already logged in
      (accessToken) => {
        accessToken ?
          router.replace('/(tabs)/home')
          : router.replace('/(auth)/login');
      }
    )
  }, []);
}