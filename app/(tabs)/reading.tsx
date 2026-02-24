import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import { getPublishedBooks, type Book } from '@/lib/api';

export default function ReadingScreen() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedBooks()
      .then(setBooks)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#C5A059" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: '700', color: '#2D2D20', marginBottom: 12 }}>Mi Lectura</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/reader/${item.id}`)} style={{ paddingVertical: 12 }}>
            <Text style={{ fontWeight: '700' }}>{item.title}</Text>
            <Text style={{ color: '#687076' }}>{item.author}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Sem leitura em progresso.</Text>}
      />
    </View>
  );
}
