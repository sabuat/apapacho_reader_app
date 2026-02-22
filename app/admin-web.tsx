import { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { useAuth } from "@/hooks/use-auth";
import { trpc } from "@/lib/trpc";
import { ScreenContainer } from "@/components/screen-container";

type Tab = "books" | "chapters" | "webinars" | "stats";

interface Book {
  id: number;
  title: string;
  author: string;
  published: boolean;
}

export default function AdminWebScreen() {
  const { user, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("books");
  const [books, setBooks] = useState<Book[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    slug: "",
  });

  const booksQuery = trpc.books.list.useQuery();
  const createBookMutation = trpc.books.create.useMutation();

  useEffect(() => {
    if (booksQuery.data) {
      setBooks(booksQuery.data as Book[]);
    }
  }, [booksQuery.data]);

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
      </ScreenContainer>
    );
  }

  const handleCreateBook = async () => {
    if (!formData.title || !formData.author || !formData.slug) {
      Alert.alert("Error", "Por favor completa todos los campos requeridos");
      return;
    }

    try {
      await createBookMutation.mutateAsync({
        title: formData.title,
        author: formData.author,
        description: formData.description,
        slug: formData.slug,
      });

      setFormData({ title: "", author: "", description: "", slug: "" });
      booksQuery.refetch();
      Alert.alert("Éxito", "Libro creado correctamente");
    } catch (error) {
      Alert.alert("Error", "No se pudo crear el libro");
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4 pb-6">
          {/* Header */}
          <View className="px-6 pt-4 gap-2 border-b border-border pb-4">
            <Text className="text-3xl font-bold font-serif text-foreground">
              Panel de Administración
            </Text>
            <Text className="text-sm text-muted">Editorial Apapacho</Text>
          </View>

          {/* Tabs */}
          <View className="px-6 flex-row gap-2 flex-wrap">
            {(["books", "chapters", "webinars", "stats"] as const).map((tab) => (
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
                  {tab === "books"
                    ? "📚 Libros"
                    : tab === "chapters"
                      ? "📖 Capítulos"
                      : tab === "webinars"
                        ? "🎥 Webinars"
                        : "📊 Estadísticas"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Books Tab */}
          {activeTab === "books" && (
            <View className="px-6 gap-4">
              <View className="bg-surface rounded-lg p-4 border border-border gap-3">
                <Text className="text-sm font-semibold text-foreground">Crear Nuevo Libro</Text>

                <TextInput
                  placeholder="Título del libro"
                  placeholderTextColor="#999"
                  value={formData.title}
                  onChangeText={(text) => setFormData({ ...formData, title: text })}
                  className="bg-background border border-border rounded px-3 py-2 text-foreground"
                />

                <TextInput
                  placeholder="Autor"
                  placeholderTextColor="#999"
                  value={formData.author}
                  onChangeText={(text) => setFormData({ ...formData, author: text })}
                  className="bg-background border border-border rounded px-3 py-2 text-foreground"
                />

                <TextInput
                  placeholder="Slug (ej: mi-libro)"
                  placeholderTextColor="#999"
                  value={formData.slug}
                  onChangeText={(text) => setFormData({ ...formData, slug: text })}
                  className="bg-background border border-border rounded px-3 py-2 text-foreground"
                />

                <TextInput
                  placeholder="Descripción (opcional)"
                  placeholderTextColor="#999"
                  value={formData.description}
                  onChangeText={(text) => setFormData({ ...formData, description: text })}
                  multiline
                  numberOfLines={3}
                  className="bg-background border border-border rounded px-3 py-2 text-foreground"
                />

                <TouchableOpacity
                  onPress={handleCreateBook}
                  className="bg-primary rounded-lg py-3"
                  disabled={createBookMutation.isPending}
                >
                  <Text className="text-white font-semibold text-center">
                    {createBookMutation.isPending ? "Creando..." : "Crear Libro"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">Libros Publicados</Text>
                {booksQuery.isLoading ? (
                  <Text className="text-sm text-muted">Cargando...</Text>
                ) : books.length === 0 ? (
                  <Text className="text-sm text-muted">No hay libros aún</Text>
                ) : (
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
                            <Text className="text-xs text-muted">{item.author}</Text>
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
                              {item.published ? "✓ Publicado" : "⊘ Borrador"}
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
                )}
              </View>
            </View>
          )}

          {/* Chapters Tab */}
          {activeTab === "chapters" && (
            <View className="px-6 gap-4">
              <View className="bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-muted">
                  Selecciona un libro para gestionar sus capítulos
                </Text>
              </View>
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

          {/* Stats Tab */}
          {activeTab === "stats" && (
            <View className="px-6 gap-4">
              <View className="grid grid-cols-2 gap-4">
                <View className="bg-surface rounded-lg p-4 border border-border">
                  <Text className="text-2xl font-bold text-primary">{books.length}</Text>
                  <Text className="text-xs text-muted">Libros Totales</Text>
                </View>
                <View className="bg-surface rounded-lg p-4 border border-border">
                  <Text className="text-2xl font-bold text-success">
                    {books.filter((b) => b.published).length}
                  </Text>
                  <Text className="text-xs text-muted">Publicados</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
