import { Stack } from 'expo-router';

export const unstable_settings = {
    initialRouteName: "index",
};

export default function SettingsLayout() {
    return <Stack screenOptions={{ headerShadowVisible: false }}>
        <Stack.Screen name='index' options={{ title: 'Settings' }} />

        <Stack.Screen name='changePasswordScreen' options={{ title: 'Change password' }} />
    </Stack>
}