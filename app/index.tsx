import { Redirect } from "expo-router";

export default function Index() {
  // Simplified auth logic: always go to login for now
  return <Redirect href="/(auth)/login" />;
}
