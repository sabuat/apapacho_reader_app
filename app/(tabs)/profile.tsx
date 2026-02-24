import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import { supabase } from '@/lib/supabase';
import { useAuthSession } from '@/lib/use-auth-session';

export default function ProfileScreen() {
  const router = useRouter();
  const { session } = useAuthSession();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: '700', color: '#2D2D20' }}>Perfil</Text>
      <Text style={{ marginTop: 14, color: '#687076' }}>{session?.user.email ?? 'Sem email'}</Text>

      <TouchableOpacity
        onPress={async () => {
          await supabase.auth.signOut();
          router.replace('/auth');
        }}
        style={{ marginTop: 24, backgroundColor: '#9E4747', padding: 12, borderRadius: 10 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '700' }}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
