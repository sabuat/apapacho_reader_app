import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";

// Mock notifications data
const NOTIFICATIONS = [
  {
    id: "1",
    type: "new_book",
    title: "Nuevo libro disponible",
    message: "La Última Dragona de Erika Villarroel ya está disponible",
    bookId: "2",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: "2",
    type: "new_webinar",
    title: "Nuevo webinar",
    message: "Escritura Creativa: Técnicas Narrativas - Hoy a las 7 PM",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: "3",
    type: "milestone",
    title: "¡Felicidades!",
    message: "Completaste 50% de Bestias de Tierras Malditas",
    bookId: "1",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: "4",
    type: "new_book",
    title: "Nuevo libro disponible",
    message: "Somos hechos de palabras de Sabuat Urbina Ribeiro",
    bookId: "3",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    read: true,
  },
];

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (hours < 1) return "Hace poco";
  if (hours < 24) return `Hace ${hours}h`;
  if (days < 7) return `Hace ${days}d`;
  return date.toLocaleDateString();
}

function getNotificationIcon(type: string): string {
  switch (type) {
    case "new_book":
      return "📚";
    case "new_webinar":
      return "🎥";
    case "milestone":
      return "🎉";
    default:
      return "📬";
  }
}

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4 pb-6">
          {/* Header */}
          <View className="px-6 pt-4 gap-2 flex-row justify-between items-center border-b border-border pb-4">
            <View>
              <Text className="text-2xl font-bold font-serif text-foreground">Notificaciones</Text>
            </View>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-primary text-lg">✕</Text>
            </TouchableOpacity>
          </View>

          {/* Notifications List */}
          <View className="px-6">
            {NOTIFICATIONS.length > 0 ? (
              <FlatList
                data={NOTIFICATIONS}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.bookId) {
                        router.push(`/reader/${item.bookId}?chapter=1`);
                      }
                    }}
                    className={`rounded-lg p-4 mb-3 flex-row gap-3 ${
                      item.read ? "bg-surface" : "bg-primary/10 border border-primary/20"
                    }`}
                  >
                    <Text className="text-2xl">{getNotificationIcon(item.type)}</Text>
                    <View className="flex-1 gap-1">
                      <Text className="text-sm font-semibold text-foreground">
                        {item.title}
                      </Text>
                      <Text className="text-xs text-muted" numberOfLines={2}>
                        {item.message}
                      </Text>
                      <Text className="text-xs text-muted mt-1">
                        {formatTime(item.timestamp)}
                      </Text>
                    </View>
                    {!item.read && (
                      <View className="w-2 h-2 rounded-full bg-primary mt-1" />
                    )}
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View className="items-center justify-center py-12 gap-2">
                <Text className="text-lg font-semibold text-foreground">
                  No hay notificaciones
                </Text>
                <Text className="text-sm text-muted text-center">
                  Te notificaremos cuando haya nuevos libros y webinars
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
