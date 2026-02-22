import { ScrollView, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { trpc } from "@/lib/trpc";

interface Webinar {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail?: string;
  duration?: number;
}

export default function WebinarsScreen() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);

  const webinarsQuery = trpc.webinars.list.useQuery();

  useEffect(() => {
    if (webinarsQuery.data) {
      setWebinars(webinarsQuery.data as Webinar[]);
      setLoading(false);
    }
  }, [webinarsQuery.data]);

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 pb-6">
          {/* Header */}
          <View className="px-6 pt-4 gap-2 border-b border-border pb-4">
            <Text className="text-3xl font-bold font-serif text-foreground">Webinars</Text>
            <Text className="text-sm text-muted">Aprende sobre escritura y lectura creativa</Text>
          </View>

          {/* Webinars List */}
          {loading ? (
            <View className="items-center justify-center py-8">
              <ActivityIndicator size="large" color="#0a7ea4" />
            </View>
          ) : webinars.length === 0 ? (
            <View className="px-6">
              <View className="bg-surface rounded-lg p-6 items-center justify-center border border-border">
                <Text className="text-sm text-muted text-center">
                  No hay webinars disponibles en este momento
                </Text>
              </View>
            </View>
          ) : (
            <View className="px-6 gap-4">
              {webinars.map((webinar) => (
                <TouchableOpacity
                  key={webinar.id}
                  className="bg-surface rounded-lg overflow-hidden border border-border active:opacity-80"
                >
                  <View className="relative">
                    <Image
                      source={webinar.thumbnail || require("@/assets/images/icon.png")}
                      style={{ width: "100%", height: 180 }}
                      contentFit="cover"
                    />
                    <View className="absolute inset-0 bg-black/30 items-center justify-center">
                      <View className="w-12 h-12 bg-white/80 rounded-full items-center justify-center">
                        <Text className="text-2xl">▶</Text>
                      </View>
                    </View>
                    {webinar.duration && (
                      <View className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded">
                        <Text className="text-white text-xs font-semibold">
                          {Math.floor(webinar.duration / 60)}:{String(webinar.duration % 60).padStart(2, "0")}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View className="p-3 gap-1">
                    <Text className="text-sm font-semibold text-foreground" numberOfLines={2}>
                      {webinar.title}
                    </Text>
                    <Text className="text-xs text-muted" numberOfLines={2}>
                      {webinar.description}
                    </Text>
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
