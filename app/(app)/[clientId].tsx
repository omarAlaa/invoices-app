import ClientInfo from "@/components/clientsTab/ClientInfo";
import CLientInvoices from "@/components/clientsTab/ClientInvoices";
import ClientStatusCards from "@/components/clientsTab/ClientStatusCards";
import { Stack, useLocalSearchParams } from "expo-router";
import { SquarePen } from "lucide-react-native";
import { ScrollView, TouchableOpacity, useColorScheme } from "react-native";

export default function ClientScreen() {
    const { clientId } = useLocalSearchParams()
    const systemColorScheme = useColorScheme()

    return (
        <ScrollView contentContainerClassName="flex-1 pt-4 px-8 gap-4">
            <Stack.Screen
                options={{
                    title: `${clientId}`,
                    headerBackButtonDisplayMode: 'minimal',
                    headerShadowVisible: false,
                    headerRight: () => (
                        <TouchableOpacity>
                            <SquarePen color={systemColorScheme === 'dark' ? 'white' : 'black'} />
                        </TouchableOpacity>
                    )
                }}
            />

            <ClientInfo />

            <ClientStatusCards />

            <CLientInvoices />
        </ScrollView>
    )
}