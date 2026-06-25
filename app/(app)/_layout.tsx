import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <Stack >
                    <Stack.Screen name="(tabs)" options={{ title: 'Back', headerShown: false }} />

                    <Stack.Screen name="profile" options={{ title: 'Profile', headerShadowVisible: false }} />
                </Stack>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}