import { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Redirect, useRouter } from 'expo-router';

import { supabase } from '@/lib/supabase';
import { useAuthSession } from '@/lib/use-auth-session';

export default function AuthScreen() {
  const { session, loading } = useAuthSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerMode, setRegisterMode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#C5A059" />
      </View>
    );
  }

  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  const onSubmit = async () => {
    if (!email || !password) {
      setMessage('Preencha email e senha');
      return;
    }

    setBusy(true);
    setMessage('');

    try {
      if (registerMode) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Conta criada. Verifique seu email e depois faça login.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.replace('/(tabs)');
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro de autenticação');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 32, fontWeight: '700', textAlign: 'center', color: '#2D2D20' }}>Apapacho</Text>
      <Text style={{ textAlign: 'center', color: '#8C97AE', marginBottom: 20 }}>Literatura que te abraza</Text>

      <TextInput
        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 10 }}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 16 }}
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
      />

      <TouchableOpacity
        style={{ backgroundColor: '#C5A059', borderRadius: 10, padding: 14, alignItems: 'center' }}
        onPress={onSubmit}
        disabled={busy}
      >
        {busy ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontWeight: '700' }}>{registerMode ? 'Crear cuenta' : 'Acceder'}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setRegisterMode((v) => !v)} style={{ marginTop: 14 }}>
        <Text style={{ textAlign: 'center', color: '#C5A059', fontWeight: '600' }}>
          {registerMode ? 'Ya tengo cuenta' : 'No tengo cuenta todavía'}
        </Text>
      </TouchableOpacity>

      {!!message && <Text style={{ marginTop: 14, textAlign: 'center', color: '#555' }}>{message}</Text>}
    </View>
  );
}
