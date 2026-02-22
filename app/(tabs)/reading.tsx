import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { supabase } from "@/lib/supabase";

export default function ReadingScreen() {
  const router = useRouter();
  const [booksInProgress, setBooksInProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await supabase.from('books').select('*').eq('published', true);
        if (error) throw error;
        if (data) setBooksInProgress(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleBookPress = (bookId: number) => {
    router.push(`/reader/${bookId}`);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 pb-6">
          <View className="px-6 pt-4 gap-2 border-b border-border pb-4">
            <Text className="text-3xl font-bold font-serif text-foreground">Mi Lectura</Text>
            <Text className="text-sm text-muted">Continúa tu aventura literaria</Text>
          </View>

          {loading ? (
            <View className="items-center justify-center py-8">
              <ActivityIndicator size="large" color="#C5A059" />
            </View>
          ) : booksInProgress.length === 0 ? (
            <View className="px-6">
              <View className="bg-surface rounded-lg p-6 items-center justify-center border border-border">
                <Text className="text-sm text-muted text-center mb-4">Aún no hay libros disponibles</Text>
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
                      source={book.cover_url ? { uri: book.cover_url } : require("@/assets/images/icon.png")}
                      style={{ width: 80, height: 120 }}
                      contentFit="cover"
                      className="rounded"
                    />
                    <View className="flex-1 justify-center">
                      <View className="gap-1 mb-2">
                        <Text className="text-sm font-semibold text-foreground">{book.title}</Text>
                        <Text className="text-xs text-muted">{book.author}</Text>
                      </View>
                      <View className="bg-background rounded-full h-1.5 overflow-hidden mt-4">
                        <View className="h-full bg-primary w-1/3" />
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