import { router } from "expo-router";
import { useEffect } from "react";
import { getAccessToken } from "@/constants/token-access";

export default function Index() {
  useEffect(() => {
    getAccessToken().then((accessToken) => {
      console.log(accessToken);

      if (accessToken) {
        router.replace('/(tabs)/home');
      }

      else {
        router.replace('/(auth)/login');
      }
    })
  }, []);
}