import { Stack } from 'expo-router';

export const unstable_settings = {
    initialRouteName: "index",
};

export default function ReportsLayout() {
    return <Stack screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
            backgroundColor: '#f2f2f2',
        },
    }}>
        <Stack.Screen name='index' options={{ title: '' }} />
    </Stack>
}