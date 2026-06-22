import { Stack } from "expo-router";

export default function AppLayout() {
    return (
        <Stack >
            <Stack.Screen name="(tabs)" options={{ title: 'Back', headerShown: false }} />

            <Stack.Screen name="profile" options={{ title: 'Profile', headerShadowVisible: false }} />
        </Stack>
    )
}