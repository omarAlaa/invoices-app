import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack >
                    <Stack.Screen name="(tabs)" options={{ title: 'Back', headerShown: false }} />

                    <Stack.Screen name="profile" options={{ title: 'Profile', headerShadowVisible: false }} />
                </Stack>
            </GestureHandlerRootView>
        </QueryClientProvider>
    )
}