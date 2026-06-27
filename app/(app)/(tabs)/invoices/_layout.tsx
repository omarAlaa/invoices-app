import { Stack } from 'expo-router';

export default function SettingsLayout() {
    return <Stack screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
            backgroundColor: '#f2f2f2',
        },
    }}>
        <Stack.Screen name='index' options={{ title: '' }} />
    </Stack>
}