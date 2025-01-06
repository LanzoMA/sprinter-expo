import { Redirect } from "expo-router";

export default function Index() {
  const loggedIn = false;

  return <Redirect href={loggedIn ? '/(tabs)/home' : '/(auth)/login'} />
}