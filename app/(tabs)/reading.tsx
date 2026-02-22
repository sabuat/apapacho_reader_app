import { ScrollView, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { trpc } from "@/lib/trpc";

interface Book {
  id: number;
  title: string;
  author: string;
  slug: string;
  published: boolean;
}

export default function ReadingScreen() {
  const router = useRouter();
  const [booksInProgress, setBooksInProgress] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const booksQuery = trpc.books.list.useQuery();

  useEffect(() => {
    if (booksQuery.data) {
      // Filtrar libros que el usuario está leyendo (en este caso, todos los publicados)
      const inProgress = (booksQuery.data as Book[]).filter((book) => book.published);
      setBooksInProgress(inProgress);
      setLoading(false);
    }
  }, [booksQuery.data]);

  const handleBookPress = (bookId: number) => {
    router.push(`/reader/${bookId}`);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 pb-6">
          {/* Header */}
          <View className="px-6 pt-4 gap-2 border-b border-border pb-4">
            <Text className="text-3xl font-bold font-serif text-foreground">Mi Lectura</Text>
            <Text className="text-sm text-muted">Continúa tu aventura literaria</Text>
          </View>

          {/* Books In Progress */}
          {loading ? (
            <View className="items-center justify-center py-8">
              <ActivityIndicator size="large" color="#0a7ea4" />
            </View>
          ) : booksInProgress.length === 0 ? (
            <View className="px-6">
              <View className="bg-surface rounded-lg p-6 items-center justify-center border border-border">
                <Text className="text-sm text-muted text-center mb-4">
                  Aún no hay libros disponibles
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(tabs)")}
                  className="bg-primary px-4 py-2 rounded-lg"
                >
                  <Text className="text-white text-sm font-semibold">Explorar Biblioteca</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View className="px-6 gap-4">
              {booksInProgress.map((book) => (
                <TouchableOpacity
                  key={book.id}
                  onPress={() => handleBookPress(book.id)}
                  className="bg-surface rounded-lg overflow-hidden border border-border active:opacity-80"
                >
                  <View className="flex-row gap-4 p-4">
                    <Image
                      source={require("@/assets/images/icon.png")}
                      style={{ width: 80, height: 120 }}
                      contentFit="cover"
                      className="rounded"
                    />
                    <View className="flex-1 justify-between">
                      <View className="gap-1">
                        <Text className="text-sm font-semibold text-foreground">{book.title}</Text>
                        <Text className="text-xs text-muted">{book.author}</Text>
                      </View>
                      <View className="gap-1">
                        <View className="bg-background rounded-full h-1.5 overflow-hidden">
                          <View className="h-full bg-primary w-1/3" />
                        </View>
                        <Text className="text-xs text-muted">33% completado</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
