import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 pb-6">
          {/* Header */}
          <View className="px-6 pt-4 gap-2 flex-row justify-between items-start">
            <View>
              <Text className="text-3xl font-bold font-serif text-foreground">Perfil</Text>
              <Text className="text-sm text-muted">Tu cuenta y preferencias</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/notifications")}
              className="relative"
            >
              <Text className="text-2xl">🔔</Text>
              <View className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">3</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* User Profile Card */}
          <View className="px-6">
            <View className="bg-surface rounded-2xl p-6 border border-border gap-4 items-center">
              <Image
                source={require("@/assets/images/icon.png")}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
              <View className="items-center gap-1">
                <Text className="text-xl font-bold font-serif text-foreground">Usuario</Text>
                <Text className="text-sm text-muted">usuario@ejemplo.com</Text>
              </View>
            </View>
          </View>

          {/* Statistics */}
          <View className="px-6 gap-3">
            <Text className="text-lg font-semibold font-serif text-foreground">Estadísticas</Text>
            <View className="flex-row gap-3">
              <View className="flex-1 bg-surface rounded-lg p-4 border border-border items-center gap-2">
                <Text className="text-2xl font-bold text-primary">3</Text>
                <Text className="text-xs text-muted text-center">Libros en progreso</Text>
              </View>
              <View className="flex-1 bg-surface rounded-lg p-4 border border-border items-center gap-2">
                <Text className="text-2xl font-bold text-primary">2</Text>
                <Text className="text-xs text-muted text-center">Completados</Text>
              </View>
              <View className="flex-1 bg-surface rounded-lg p-4 border border-border items-center gap-2">
                <Text className="text-2xl font-bold text-primary">45</Text>
                <Text className="text-xs text-muted text-center">Horas leídas</Text>
              </View>
            </View>
          </View>

          {/* Settings */}
          <View className="px-6 gap-3">
            <Text className="text-lg font-semibold font-serif text-foreground">Configuración</Text>
            <View className="bg-surface rounded-lg border border-border overflow-hidden">
              <TouchableOpacity className="px-4 py-3 border-b border-border flex-row justify-between items-center">
                <Text className="text-sm text-foreground">Notificaciones</Text>
                <Text className="text-primary">→</Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-4 py-3 border-b border-border flex-row justify-between items-center">
                <Text className="text-sm text-foreground">Preferencias de lectura</Text>
                <Text className="text-primary">→</Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-4 py-3 border-b border-border flex-row justify-between items-center">
                <Text className="text-sm text-foreground">Cambiar contraseña</Text>
                <Text className="text-primary">→</Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-4 py-3 flex-row justify-between items-center">
                <Text className="text-sm text-foreground">Acerca de</Text>
                <Text className="text-primary">→</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Logout Button */}
          <View className="px-6">
            <TouchableOpacity className="bg-error rounded-lg py-3">
              <Text className="text-sm font-semibold text-white text-center">Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
