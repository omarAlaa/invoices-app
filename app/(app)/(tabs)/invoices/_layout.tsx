import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function InvoicesLayout() {
    const isDark = useColorScheme() === 'dark'

    return <Stack screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
            backgroundColor: isDark ? 'black' : '#f2f2f2',
        },
    }} />
}