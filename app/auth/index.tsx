import { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Redirect, useRouter } from 'expo-router';

import { ScreenContainer } from '@/components/screen-container';
import { supabase } from '@/lib/supabase';
import { useAuthSession } from '@/lib/use-auth-session';

export default function AuthScreen() {
  const router = useRouter();
  const { session, loading } = useAuthSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#C5A059" />
      </ScreenContainer>
    );
  }

  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  const handleAuth = async () => {
    if (!email || !password) {
      setMessage('Preencha email e senha.');
      return;
    }

    setBusy(true);
    setMessage(null);

    try {
      if (isRegisterMode) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Conta criada. Verifique seu email para confirmar o acesso.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.replace('/(tabs)');
      }
    } catch (error) {
      const authMessage = error instanceof Error ? error.message : 'Erro inesperado';
      setMessage(authMessage);
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScreenContainer className="bg-background items-center justify-center px-6">
      <View className="w-full max-w-md bg-surface border border-border rounded-2xl p-6 gap-4">
        <Text className="text-3xl font-bold font-serif text-foreground text-center">Apapacho</Text>
        <Text className="text-sm text-muted text-center">Literatura que te abraza</Text>

        <View className="gap-3 mt-2">
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            className="bg-background border border-border rounded-lg px-4 py-3 text-foreground"
            placeholderTextColor="#8C97AE"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Senha"
            secureTextEntry
            className="bg-background border border-border rounded-lg px-4 py-3 text-foreground"
            placeholderTextColor="#8C97AE"
          />
        </View>

        <TouchableOpacity onPress={handleAuth} disabled={busy} className="bg-primary rounded-lg py-3">
          {busy ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center font-semibold">{isRegisterMode ? 'Crear cuenta' : 'Acceder'}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsRegisterMode((prev) => !prev)}>
          <Text className="text-center text-primary font-semibold">
            {isRegisterMode ? 'Ya tengo cuenta' : 'No tengo cuenta todavía'}
          </Text>
        </TouchableOpacity>

        {message ? <Text className="text-center text-muted text-xs">{message}</Text> : null}
      </View>
    </ScreenContainer>
  );
}
