import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAuthSession } from '@/lib/use-auth-session';

export default function RootLayout() {
  const { session, loading } = useAuthSession();

  if (loading) {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#C5A059" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      {!session ? <Redirect href="/auth" /> : null}
      <Stack screenOptions={{ headerShown: false }}>
        {session ? (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="reader/[id]" />
          </>
        ) : (
          <Stack.Screen name="auth/index" />
        )}
      </Stack>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
