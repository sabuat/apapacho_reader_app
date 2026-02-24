import { useState, useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { ScreenContainer } from '@/components/screen-container';
import { type Book, type Chapter, getBookById, getChapterByNumber, getChapterCount } from '@/lib/api';

export default function ReaderScreen() {
  const router = useRouter();
  const { id, chapter: chapterParam } = useLocalSearchParams();

  const bookId = Number(id);
  const [fontSize, setFontSize] = useState(16);
  const [currentChapter, setCurrentChapter] = useState(Number(chapterParam ?? 1) || 1);
  const [showAd, setShowAd] = useState(false);

  const [book, setBook] = useState<Book | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [totalChapters, setTotalChapters] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookId) return;

    const fetchBookInfo = async () => {
      try {
        const [bookData, chapterCount] = await Promise.all([getBookById(bookId), getChapterCount(bookId)]);
        setBook(bookData);
        setTotalChapters(chapterCount);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Error cargando libro:', message);
      }
    };

    fetchBookInfo();
  }, [bookId]);

  useEffect(() => {
    if (!bookId) return;

    const fetchChapterContent = async () => {
      setLoading(true);
      try {
        const chapterData = await getChapterByNumber(bookId, currentChapter);
        setChapter(chapterData);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Error cargando capítulo:', message);
        setChapter(null);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterContent();
  }, [bookId, currentChapter]);

  const handleNextChapter = () => {
    if (currentChapter < totalChapters) {
      setShowAd(true);
      setTimeout(() => {
        setShowAd(false);
        setCurrentChapter((prev) => prev + 1);
      }, 3000);
    }
  };

  const handlePreviousChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter((prev) => prev - 1);
    }
  };

  if (loading && !chapter) {
    return (
      <ScreenContainer className="items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#C5A059" />
        <Text className="text-foreground mt-4">Abriendo libro...</Text>
      </ScreenContainer>
    );
  }

  if (!book || !chapter) {
    return (
      <ScreenContainer className="items-center justify-center bg-background">
        <Text className="text-foreground">Este capítulo aún no está disponible.</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 px-4 py-2 bg-primary rounded-lg">
          <Text className="text-white font-semibold">Volver a la biblioteca</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  const progress = totalChapters > 0 ? (currentChapter / totalChapters) * 100 : 0;

  return (
    <ScreenContainer className="bg-background">
      <View className="px-4 py-3 border-b border-border flex-row justify-between items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Text className="text-primary text-2xl leading-none">←</Text>
        </TouchableOpacity>
        <View className="flex-1 mx-4">
          <Text className="text-sm font-semibold text-foreground text-center" numberOfLines={1}>
            {book.title}
          </Text>
          <Text className="text-xs text-muted text-center">Capítulo {currentChapter} de {totalChapters}</Text>
        </View>
        <View className="w-8" />
      </View>

      {showAd && (
        <View className="absolute z-50 inset-0 bg-background items-center justify-center px-6">
          <Text className="text-sm font-bold text-primary mb-4 tracking-widest">PUBLICIDAD</Text>
          <View className="w-full h-64 bg-surface rounded-xl border border-border items-center justify-center mb-8 shadow-sm">
            <Text className="text-muted text-center px-4">Espacio reservado para tu red de anuncios (AdMob / Meta)</Text>
          </View>
          <ActivityIndicator size="small" color="#C5A059" className="mb-4" />
          <Text className="text-sm text-foreground text-center font-semibold">Tu capítulo cargará en breve...</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-6 py-8 gap-6">
          <View className="gap-2 mb-2">
            <Text className="text-xs text-primary font-bold uppercase tracking-wider">Capítulo {chapter.chapter_number}</Text>
            <Text className="text-3xl font-bold font-serif text-foreground leading-tight">{chapter.title}</Text>
          </View>

          <Text style={{ fontSize, lineHeight: fontSize * 1.6 }} className="text-foreground text-justify">
            {chapter.content}
          </Text>

          <View className="bg-surface rounded-xl p-5 mt-8 border border-border items-center shadow-sm">
            <Text className="text-[10px] font-bold text-muted uppercase tracking-wider mb-3">Patrocinado</Text>
            <Text className="text-base font-serif text-foreground text-center mb-4">
              ¿Te está gustando la lectura? Apoya a Apapacho compartiendo la app.
            </Text>
            <TouchableOpacity className="bg-primary rounded-lg px-6 py-2.5 w-full">
              <Text className="text-white text-sm font-semibold text-center">Descubrir más libros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View className="border-t border-border px-5 py-5 gap-4 bg-background">
        <View className="gap-2">
          <View className="h-1.5 bg-surface rounded-full overflow-hidden border border-border/50">
            <View className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
          </View>
          <Text className="text-[10px] text-muted text-center font-semibold uppercase tracking-wider">
            {Math.round(progress)}% completado
          </Text>
        </View>

        <View className="flex-row justify-between items-center mt-2">
          <TouchableOpacity
            onPress={handlePreviousChapter}
            disabled={currentChapter === 1}
            className={`flex-1 py-3 border border-border rounded-lg mr-2 ${currentChapter === 1 ? 'opacity-40 bg-surface' : 'bg-background'}`}
          >
            <Text className="text-sm font-semibold text-foreground text-center">Anterior</Text>
          </TouchableOpacity>

          <View className="flex-row bg-surface rounded-lg p-1 mx-2 border border-border">
            <TouchableOpacity onPress={() => setFontSize(Math.max(14, fontSize - 2))} className="px-4 py-2">
              <Text className="text-foreground font-semibold text-sm">A-</Text>
            </TouchableOpacity>
            <View className="w-px bg-border my-2" />
            <TouchableOpacity onPress={() => setFontSize(Math.min(28, fontSize + 2))} className="px-4 py-2">
              <Text className="text-foreground font-semibold text-base">A+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleNextChapter}
            disabled={currentChapter >= totalChapters}
            className={`flex-1 py-3 rounded-lg ml-2 ${currentChapter >= totalChapters ? 'opacity-50 bg-surface border border-border' : 'bg-primary'}`}
          >
            <Text className={`text-sm font-semibold text-center ${currentChapter >= totalChapters ? 'text-foreground' : 'text-white'}`}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}
