import { useState, useEffect } from "react";
import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { getBookById, getChapterByNumber } from "@/lib/books-data";

export default function ReaderScreen() {
  const router = useRouter();
  const { id, chapter: chapterParam } = useLocalSearchParams();
  const [fontSize, setFontSize] = useState(16);
  const [currentChapter, setCurrentChapter] = useState(parseInt(chapterParam as string) || 1);
  const [showAd, setShowAd] = useState(false);

  const book = getBookById(id as string);
  const chapter = book ? getChapterByNumber(book, currentChapter) : null;

  if (!book || !chapter) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground">Libro no encontrado</Text>
      </ScreenContainer>
    );
  }

  const handleNextChapter = () => {
    if (currentChapter < book.chapters.length) {
      // Show ad every 3 chapters
      if (currentChapter % 3 === 0) {
        setShowAd(true);
        setTimeout(() => {
          setShowAd(false);
          setCurrentChapter(currentChapter + 1);
        }, 3000);
      } else {
        setCurrentChapter(currentChapter + 1);
      }
    }
  };

  const handlePreviousChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const progress = (currentChapter / book.chapters.length) * 100;

  return (
    <ScreenContainer className="bg-background">
      {/* Header */}
      <View className="px-4 py-3 border-b border-border flex-row justify-between items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-primary text-lg">←</Text>
        </TouchableOpacity>
        <View className="flex-1 mx-4">
          <Text className="text-sm font-semibold text-foreground text-center" numberOfLines={1}>
            {book.title}
          </Text>
          <Text className="text-xs text-muted text-center">
            Capítulo {currentChapter} de {book.chapters.length}
          </Text>
        </View>
        <TouchableOpacity>
          <Text className="text-primary text-lg">⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Ad Banner */}
      {showAd && (
        <View className="bg-secondary/10 border-b border-secondary px-4 py-3">
          <Text className="text-xs text-muted text-center">
            Publicidad: Continúa leyendo en 3 segundos...
          </Text>
        </View>
      )}

      {/* Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="px-6 py-6 gap-4">
          {/* Chapter Title */}
          <View className="gap-2 mb-4">
            <Text className="text-2xl font-bold font-serif text-foreground">
              {chapter.title}
            </Text>
            <Text className="text-sm text-muted">Capítulo {chapter.number}</Text>
          </View>

          {/* Chapter Content */}
          <Text
            style={{ fontSize }}
            className="text-foreground leading-relaxed"
          >
            {chapter.content}
          </Text>

          {/* Ad Banner at End of Chapter */}
          {currentChapter % 3 === 0 && (
            <View className="bg-primary/10 rounded-lg p-4 mt-6 border border-primary/20">
              <Text className="text-xs font-semibold text-primary mb-2">PUBLICIDAD</Text>
              <Text className="text-sm text-foreground">
                Descubre más libros en Editorial Apapacho
              </Text>
              <TouchableOpacity className="mt-3 bg-primary rounded px-3 py-2">
                <Text className="text-white text-xs font-semibold text-center">
                  Explorar biblioteca
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer Controls */}
      <View className="border-t border-border px-4 py-4 gap-3">
        {/* Progress Bar */}
        <View className="gap-1">
          <View className="h-1 bg-border rounded-full overflow-hidden">
            <View
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </View>
          <Text className="text-xs text-muted text-center">
            {Math.round(progress)}% completado
          </Text>
        </View>

        {/* Font Size Controls */}
        <View className="flex-row justify-center gap-4 mb-2">
          <TouchableOpacity
            onPress={() => setFontSize(Math.max(12, fontSize - 2))}
            className="px-3 py-2 bg-surface rounded border border-border"
          >
            <Text className="text-sm text-foreground">A-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFontSize(16)}
            className="px-3 py-2 bg-surface rounded border border-border"
          >
            <Text className="text-sm text-foreground">Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFontSize(Math.min(24, fontSize + 2))}
            className="px-3 py-2 bg-surface rounded border border-border"
          >
            <Text className="text-sm text-foreground">A+</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation */}
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={handlePreviousChapter}
            disabled={currentChapter === 1}
            className="flex-1 bg-surface rounded-lg py-3 border border-border disabled:opacity-50"
          >
            <Text className="text-sm font-semibold text-foreground text-center">
              ← Anterior
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNextChapter}
            disabled={currentChapter === book.chapters.length}
            className="flex-1 bg-primary rounded-lg py-3 disabled:opacity-50"
          >
            <Text className="text-sm font-semibold text-white text-center">
              Siguiente →
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}
