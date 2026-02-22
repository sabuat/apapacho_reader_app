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
  description?: string;
  published: boolean;
}

export default function HomeScreen() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const booksQuery = trpc.books.list.useQuery();

  useEffect(() => {
    if (booksQuery.data) {
      setBooks(booksQuery.data as Book[]);
      setLoading(false);
    }
  }, [booksQuery.data]);

  useEffect(() => {
    if (booksQuery.isLoading) {
      setLoading(true);
    }
  }, [booksQuery.isLoading]);

  const handleBookPress = (bookId: number) => {
    router.push(`/reader/${bookId}`);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 pb-6">
          {/* Header */}
          <View className="px-6 pt-4 gap-2">
            <Text className="text-3xl font-bold font-serif text-foreground">Apapacho</Text>
            <Text className="text-sm text-muted">Literatura que te abraza</Text>
          </View>

          {/* Featured Section */}
          {!loading && books.length > 0 && (
            <View className="px-6 gap-3">
              <Text className="text-lg font-semibold font-serif text-foreground">Continúa leyendo</Text>
              <TouchableOpacity
                onPress={() => handleBookPress(books[0].id)}
                className="bg-surface rounded-2xl p-4 border border-border active:opacity-80"
              >
                <View className="flex-row gap-4">
                  <Image
                    source={require("@/assets/images/icon.png")}
                    style={{ width: 80, height: 120 }}
                    contentFit="cover"
                    className="rounded"
                  />
                  <View className="flex-1 justify-between">
                    <View className="gap-1">
                      <Text className="text-sm font-semibold text-foreground">{books[0].title}</Text>
                      <Text className="text-xs text-muted">{books[0].author}</Text>
                    </View>
                    <View className="bg-background rounded-full h-1.5 overflow-hidden">
                      <View className="h-full bg-primary w-2/5" />
                    </View>
                    <Text className="text-xs text-muted">45% completado</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Books Library Section */}
          <View className="px-6 gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-semibold font-serif text-foreground">Biblioteca</Text>
              <TouchableOpacity>
                <Text className="text-sm font-semibold text-primary">Ver todo</Text>
              </TouchableOpacity>
            </View>

            {loading ? (
              <View className="items-center justify-center py-8">
                <ActivityIndicator size="large" color="#0a7ea4" />
              </View>
            ) : books.length === 0 ? (
              <View className="bg-surface rounded-lg p-6 items-center justify-center border border-border">
                <Text className="text-sm text-muted text-center">
                  No hay libros disponibles en este momento
                </Text>
              </View>
            ) : (
              <FlatList
                data={books}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                numColumns={2}
                columnWrapperStyle={{ gap: 12 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleBookPress(item.id)}
                    className="flex-1 bg-surface rounded-lg overflow-hidden border border-border active:opacity-80"
                  >
                    <Image
                      source={require("@/assets/images/icon.png")}
                      style={{ width: "100%", height: 180 }}
                      contentFit="cover"
                    />
                    <View className="p-3 gap-1">
                      <Text className="text-xs font-semibold text-foreground" numberOfLines={2}>
                        {item.title}
                      </Text>
                      <Text className="text-xs text-muted" numberOfLines={1}>
                        {item.author}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
