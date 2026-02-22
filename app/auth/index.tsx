import { ScrollView, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { supabase } from "@/lib/supabase";

interface Book {
  id: number;
  title: string;
  author: string;
  slug: string;
  description?: string;
  published: boolean;
  cover_url?: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('published', true)
        .order('id', { ascending: false });
        
      if (error) throw error;
      if (data) setBooks(data);
    } catch (error) {
      console.error("Error cargando libros:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookPress = (bookId: number) => {
    router.push(`/reader/${bookId}`);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 pb-6">
          <View className="px-6 pt-4 gap-2">
            <Text className="text-3xl font-bold font-serif text-foreground">Apapacho</Text>
            <Text className="text-sm text-muted">Literatura que te abraza</Text>
          </View>

          {!loading && books.length > 0 && (
            <View className="px-6 gap-3">
              <Text className="text-lg font-semibold font-serif text-foreground">Destacado</Text>
              <TouchableOpacity
                onPress={() => handleBookPress(books[0].id)}
                className="bg-surface rounded-2xl p-4 border border-border active:opacity-80"
              >
                <View className="flex-row gap-4">
                  <Image
                    source={books[0].cover_url ? { uri: books[0].cover_url } : require("@/assets/images/icon.png")}
                    style={{ width: 80, height: 120 }}
                    contentFit="cover"
                    className="rounded border border-border"
                  />
                  <View className="flex-1 justify-center">
                    <View className="gap-1 mb-4">
                      <Text className="text-lg font-semibold text-foreground">{books[0].title}</Text>
                      <Text className="text-sm text-muted">{books[0].author}</Text>
                    </View>
                    <View className="bg-primary rounded px-3 py-2 self-start">
                      <Text className="text-white text-xs font-semibold">Comenzar a leer</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}

          <View className="px-6 gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-semibold font-serif text-foreground">Biblioteca</Text>
            </View>

            {loading ? (
              <View className="items-center justify-center py-8">
                <ActivityIndicator size="large" color="#C5A059" />
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
                    className="flex-1 bg-surface rounded-lg overflow-hidden border border-border active:opacity-80 mb-4"
                  >
                    <Image
                      source={item.cover_url ? { uri: item.cover_url } : require("@/assets/images/icon.png")}
                      style={{ width: "100%", height: 180 }}
                      contentFit="cover"
                    />
                    <View className="p-3 gap-1">
                      <Text className="text-sm font-semibold text-foreground" numberOfLines={2}>
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