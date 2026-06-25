import { Stack } from 'expo-router';

export default function ClientsLayout() {
    return <Stack screenOptions={{ headerShadowVisible: false }}>
        <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
}