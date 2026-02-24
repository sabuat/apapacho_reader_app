import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import { getPublishedBooks, type Book } from '@/lib/api';

export default function HomeScreen() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedBooks()
      .then(setBooks)
      .catch((e) => console.error(e))
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
      <Text style={{ fontSize: 28, fontWeight: '700', color: '#2D2D20', marginBottom: 12 }}>Biblioteca</Text>

      <FlatList
        data={books}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12, marginBottom: 10, flexDirection: 'row', gap: 10 }}
            onPress={() => router.push(`/reader/${item.id}`)}
          >
            <Image
              source={item.cover_url ? { uri: item.cover_url } : require('@/assets/images/icon.png')}
              style={{ width: 52, height: 78, borderRadius: 6, backgroundColor: '#eee' }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '700', color: '#2D2D20' }}>{item.title}</Text>
              <Text style={{ color: '#687076', marginTop: 4 }}>{item.author}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Nenhum livro publicado ainda.</Text>}
      />
    </View>
  );
}
