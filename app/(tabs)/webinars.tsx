import { ScrollView, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

export default function WebinarsScreen() {
  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 pb-6">
          <View className="px-6 pt-4 gap-2 border-b border-border pb-4">
            <Text className="text-3xl font-bold font-serif text-foreground">Webinars</Text>
            <Text className="text-sm text-muted">Aprende sobre escritura y lectura creativa</Text>
          </View>
          <View className="px-6">
            <View className="bg-surface rounded-lg p-6 items-center justify-center border border-border">
              <Text className="text-sm text-muted text-center">
                Próximamente: Webinars y contenido exclusivo
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}