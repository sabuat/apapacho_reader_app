import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";

export default function AuthScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (!isLogin && !name) {
      Alert.alert("Error", "Por favor ingresa tu nombre");
      return;
    }

    setLoading(true);
    try {
      // Mock authentication - in production, this would call an API
      setTimeout(() => {
        Alert.alert("Éxito", isLogin ? "Sesión iniciada" : "Cuenta creada");
        router.replace("/(tabs)");
      }, 1000);
    } catch (error) {
      Alert.alert("Error", "Algo salió mal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-6 gap-6 py-8">
          {/* Logo/Header */}
          <View className="items-center gap-2 mb-4">
            <Text className="text-4xl font-bold font-serif text-primary">Apapacho</Text>
            <Text className="text-sm text-muted">Literatura que te abraza</Text>
          </View>

          {/* Title */}
          <View className="gap-1">
            <Text className="text-2xl font-bold font-serif text-foreground">
              {isLogin ? "Inicia sesión" : "Crea tu cuenta"}
            </Text>
            <Text className="text-sm text-muted">
              {isLogin
                ? "Accede a tu biblioteca personal"
                : "Únete a nuestra comunidad de lectores"}
            </Text>
          </View>

          {/* Form */}
          <View className="gap-4">
            {!isLogin && (
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">Nombre</Text>
                <TextInput
                  placeholder="Tu nombre completo"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="#687076"
                  className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                />
              </View>
            )}

            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Email</Text>
              <TextInput
                placeholder="tu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#687076"
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              />
            </View>

            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Contraseña</Text>
              <TextInput
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#687076"
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              />
            </View>
          </View>

          {/* Auth Button */}
          <TouchableOpacity
            onPress={handleAuth}
            disabled={loading}
            className="bg-primary rounded-lg py-3 disabled:opacity-50"
          >
            <Text className="text-white font-semibold text-center">
              {loading ? "Procesando..." : isLogin ? "Iniciar sesión" : "Crear cuenta"}
            </Text>
          </TouchableOpacity>

          {/* Toggle Auth Mode */}
          <View className="flex-row justify-center gap-1">
            <Text className="text-sm text-muted">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
            </Text>
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text className="text-sm text-primary font-semibold">
                {isLogin ? "Regístrate" : "Inicia sesión"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="flex-row items-center gap-3">
            <View className="flex-1 h-px bg-border" />
            <Text className="text-xs text-muted">O continúa con</Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          {/* Social Auth Buttons */}
          <View className="gap-2">
            <TouchableOpacity className="bg-surface border border-border rounded-lg py-3 flex-row items-center justify-center gap-2">
              <Text className="text-lg">🔵</Text>
              <Text className="text-sm font-semibold text-foreground">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-surface border border-border rounded-lg py-3 flex-row items-center justify-center gap-2">
              <Text className="text-lg">🍎</Text>
              <Text className="text-sm font-semibold text-foreground">Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <Text className="text-xs text-muted text-center">
            Al continuar, aceptas nuestros{" "}
            <Text className="text-primary font-semibold">Términos de Servicio</Text> y{" "}
            <Text className="text-primary font-semibold">Política de Privacidad</Text>
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
