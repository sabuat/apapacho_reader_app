import { View, ViewProps, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "@/lib/utils";

export interface ScreenContainerProps extends ViewProps {
  className?: string;
  containerClassName?: string;
}

export function ScreenContainer({ 
  children, 
  className, 
  containerClassName,
  style, 
  ...props 
}: ScreenContainerProps) {
  return (
    <SafeAreaView 
      style={[{ flex: 1, backgroundColor: '#f9f7f4', paddingTop: Platform.OS === 'android' ? 30 : 0 }, style]} 
      {...props}
    >
      <View className={cn("flex-1", className)}>
        {children}
      </View>
    </SafeAreaView>
  );
}