import { router } from "expo-router";
import { useEffect } from "react";
import { getAccessToken } from "@/constants/token-access";

export default function Index() {
  useEffect(() => {
    getAccessToken().then(
      (accessToken) => {
        accessToken ?
          router.replace('/(tabs)/home')
          : router.replace('/(auth)/login');
      }
    )
  }, []);
}