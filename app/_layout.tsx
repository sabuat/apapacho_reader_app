import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import "@/global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="reader/[id]" options={{ presentation: 'fullScreenModal' }} />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}