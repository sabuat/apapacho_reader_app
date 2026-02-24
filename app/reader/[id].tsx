import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { getBookById, getChapterByNumber, getChapterCount, type Book, type Chapter } from '@/lib/api';

export default function ReaderScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const bookId = Number(id);

  const [book, setBook] = useState<Book | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [chapterNumber, setChapterNumber] = useState(1);
  const [totalChapters, setTotalChapters] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    if (!bookId) return;
    Promise.all([getBookById(bookId), getChapterCount(bookId)]).then(([b, count]) => {
      setBook(b);
      setTotalChapters(count);
    });
  }, [bookId]);

  useEffect(() => {
    if (!bookId) return;
    setLoading(true);
    getChapterByNumber(bookId, chapterNumber)
      .then(setChapter)
      .finally(() => setLoading(false));
  }, [bookId, chapterNumber]);

  const progress = useMemo(() => {
    if (!totalChapters) return 0;
    return Math.round((chapterNumber / totalChapters) * 100);
  }, [chapterNumber, totalChapters]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#C5A059" />
      </View>
    );
  }

  if (!book || !chapter) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <Text>Capítulo não disponível.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 12 }}>
          <Text style={{ color: '#C5A059', fontWeight: '700' }}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const nextChapter = () => {
    if (chapterNumber >= totalChapters) return;
    setShowAd(true);
    setTimeout(() => {
      setShowAd(false);
      setChapterNumber((v) => v + 1);
    }, 2000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ fontSize: 22, color: '#C5A059' }}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={{ fontWeight: '700' }} numberOfLines={1}>{book.title}</Text>
          <Text style={{ color: '#687076' }}>Capítulo {chapterNumber} de {totalChapters}</Text>
        </View>
      </View>

      {showAd ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <Text style={{ color: '#C5A059', fontWeight: '700' }}>PUBLICIDAD</Text>
          <View style={{ height: 160, width: '100%', backgroundColor: '#f2f2f2', borderRadius: 12, marginTop: 12, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Espacio para anuncio</Text>
          </View>
        </View>
      ) : (
        <>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
            <Text style={{ color: '#C5A059', fontWeight: '700' }}>Capítulo {chapter.chapter_number}</Text>
            <Text style={{ fontSize: 26, fontWeight: '700', marginTop: 4 }}>{chapter.title}</Text>
            <Text style={{ marginTop: 16, fontSize: 16, lineHeight: 26, color: '#2D2D20' }}>{chapter.content}</Text>
          </ScrollView>

          <View style={{ padding: 12, borderTopWidth: 1, borderTopColor: '#eee' }}>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>{progress}% completado</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                style={{ flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', opacity: chapterNumber === 1 ? 0.4 : 1 }}
                disabled={chapterNumber === 1}
                onPress={() => setChapterNumber((v) => Math.max(1, v - 1))}
              >
                <Text style={{ textAlign: 'center' }}>Anterior</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1, padding: 12, borderRadius: 8, backgroundColor: '#C5A059', opacity: chapterNumber >= totalChapters ? 0.4 : 1 }}
                disabled={chapterNumber >= totalChapters}
                onPress={nextChapter}
              >
                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '700' }}>Siguiente</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
