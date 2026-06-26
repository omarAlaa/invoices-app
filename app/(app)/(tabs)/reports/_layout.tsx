import { Stack } from 'expo-router';

export const unstable_settings = {
    initialRouteName: "index",
};

export default function ReportsLayout() {
    return <Stack screenOptions={{ headerShadowVisible: false }}>
        <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
}