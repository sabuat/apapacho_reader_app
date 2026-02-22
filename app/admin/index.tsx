import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert, FlatList } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";

export default function AdminScreen() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<"books" | "chapters" | "webinars">("books");
  const [books, setBooks] = useState([
    { id: 1, title: "Bestias de Tierras Malditas", published: true },
    { id: 2, title: "La Última Dragona", published: false },
  ]);

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground">Cargando...</Text>
      </ScreenContainer>
    );
  }

  if (!isAuthenticated || (user as any)?.role !== "admin") {
    return (
      <ScreenContainer className="items-center justify-center gap-4">
        <Text className="text-lg font-bold text-foreground">Acceso Denegado</Text>
        <Text className="text-sm text-muted text-center">
          Solo administradores pueden acceder a este panel
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-primary rounded-lg px-6 py-2"
        >
          <Text className="text-white font-semibold">Volver</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4 pb-6">
          {/* Header */}
          <View className="px-6 pt-4 gap-2 flex-row justify-between items-center border-b border-border pb-4">
            <View>
              <Text className="text-2xl font-bold font-serif text-foreground">Admin</Text>
              <Text className="text-xs text-muted">Panel de Administración</Text>
            </View>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-primary text-lg">✕</Text>
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View className="px-6 flex-row gap-2">
            {(["books", "chapters", "webinars"] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === tab ? "bg-primary" : "bg-surface border border-border"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    activeTab === tab ? "text-white" : "text-foreground"
                  }`}
                >
                  {tab === "books" ? "Libros" : tab === "chapters" ? "Capítulos" : "Webinars"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Books Tab */}
          {activeTab === "books" && (
            <View className="px-6 gap-4">
              <TouchableOpacity className="bg-primary rounded-lg py-3">
                <Text className="text-white font-semibold text-center">+ Nuevo Libro</Text>
              </TouchableOpacity>

              <FlatList
                data={books}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View className="bg-surface rounded-lg p-4 mb-3 border border-border">
                    <View className="flex-row justify-between items-start mb-2">
                      <View className="flex-1">
                        <Text className="text-sm font-semibold text-foreground">
                          {item.title}
                        </Text>
                      </View>
                      <View
                        className={`px-2 py-1 rounded ${
                          item.published ? "bg-success/20" : "bg-warning/20"
                        }`}
                      >
                        <Text
                          className={`text-xs font-semibold ${
                            item.published ? "text-success" : "text-warning"
                          }`}
                        >
                          {item.published ? "Publicado" : "Borrador"}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row gap-2">
                      <TouchableOpacity className="flex-1 bg-primary/10 rounded px-3 py-2 border border-primary/20">
                        <Text className="text-xs font-semibold text-primary text-center">
                          Editar
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-1 bg-error/10 rounded px-3 py-2 border border-error/20">
                        <Text className="text-xs font-semibold text-error text-center">
                          Eliminar
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          )}

          {/* Chapters Tab */}
          {activeTab === "chapters" && (
            <View className="px-6 gap-4">
              <Text className="text-sm text-muted">
                Selecciona un libro para gestionar sus capítulos
              </Text>
            </View>
          )}

          {/* Webinars Tab */}
          {activeTab === "webinars" && (
            <View className="px-6 gap-4">
              <TouchableOpacity className="bg-primary rounded-lg py-3">
                <Text className="text-white font-semibold text-center">+ Nuevo Webinar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
