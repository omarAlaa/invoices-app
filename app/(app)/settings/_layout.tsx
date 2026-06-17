import { Stack } from 'expo-router';

export default function SettingsLayout() {
    return <Stack screenOptions={{ headerShadowVisible: false }}>
        <Stack.Screen name='index' options={{ title: 'Settings' }} />

        <Stack.Screen name='profile' options={{ title: 'Profile' }} />

        <Stack.Screen name='changePasswordScreen' options={{ title: 'Change password' }} />
    </Stack>
}