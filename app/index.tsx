import { Redirect } from "expo-router";

export default function Index() {
  const loggedIn = true;

  return <Redirect href={loggedIn ? '/(tabs)/home' : '/(auth)/login'} />
}