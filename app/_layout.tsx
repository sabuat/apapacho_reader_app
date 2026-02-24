import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import '@/global.css';

import { useAuthSession } from '@/lib/use-auth-session';

export default function RootLayout() {
  const { session, loading } = useAuthSession();

  if (loading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {session ? (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="reader/[id]" options={{ presentation: 'fullScreenModal' }} />
          </>
        ) : (
          <Stack.Screen name="auth/index" />
        )}
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
