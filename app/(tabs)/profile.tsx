import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import { ScreenContainer } from '@/components/screen-container';
import { supabase } from '@/lib/supabase';
import { useAuthSession } from '@/lib/use-auth-session';

export default function ProfileScreen() {
  const router = useRouter();
  const { session } = useAuthSession();

  const userEmail = session?.user.email ?? 'Sem email';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/auth');
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 pb-6">
          <View className="px-6 pt-4 gap-2 flex-row justify-between items-start">
            <View>
              <Text className="text-3xl font-bold font-serif text-foreground">Perfil</Text>
              <Text className="text-sm text-muted">Tu cuenta y preferencias</Text>
            </View>
          </View>

          <View className="px-6">
            <View className="bg-surface rounded-2xl p-6 border border-border gap-4 items-center">
              <Image source={require('@/assets/images/icon.png')} style={{ width: 80, height: 80, borderRadius: 40 }} />
              <View className="items-center gap-1">
                <Text className="text-xl font-bold font-serif text-foreground">Leitor Apapacho</Text>
                <Text className="text-sm text-muted">{userEmail}</Text>
              </View>
            </View>
          </View>

          <View className="px-6">
            <TouchableOpacity className="bg-error rounded-lg py-3" onPress={handleLogout}>
              <Text className="text-sm font-semibold text-white text-center">Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
