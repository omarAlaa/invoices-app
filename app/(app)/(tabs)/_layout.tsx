import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                    )
                }} />
            <Tabs.Screen
                name='invoices'
                options={{
                    title: 'Invoices',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'receipt-sharp' : 'receipt-outline'} color={color} size={24} />
                    )
                }} />
            <Tabs.Screen
                name='customers'
                options={{
                    title: 'Customers',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'people-sharp' : 'people-outline'} color={color} size={24} />
                    )
                }} />
            <Tabs.Screen
                name='reports'
                options={{
                    title: 'Reports',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'stats-chart-sharp' : 'stats-chart-outline'} color={color} size={24} />
                    )
                }} />
            <Tabs.Screen
                name='settings'
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'settings-sharp' : 'settings-outline'} color={color} size={24} />
                    )
                }} />
        </Tabs>
    )
}