import InvoiceActions from "@/components/invoiceScreen/InvoiceActions";
import InvoiceInfo from "@/components/invoiceScreen/InvoiceInfo";
import InvoiceItemsSection from "@/components/invoiceScreen/InvoiceItemsSection";
import TotalAmount from "@/components/invoiceScreen/TotalAmount";
import Status from "@/components/shared/Status";
import { Stack, useLocalSearchParams } from "expo-router";
import { Ellipsis } from "lucide-react-native";
import { ScrollView, TouchableOpacity, View, useColorScheme } from "react-native";

export default function Invoice() {
    const { invoiceId } = useLocalSearchParams()
    const systemColorScheme = useColorScheme()

    return (
        <ScrollView contentContainerClassName="pt-4 pb-16 px-8 gap-4">
            <Stack.Screen
                options={{
                    title: `Invoice #${invoiceId}`,
                    headerBackButtonDisplayMode: 'minimal',
                    headerShadowVisible: false,
                    headerRight: () => (
                        <TouchableOpacity>
                            <Ellipsis color={systemColorScheme === 'dark' ? 'white' : 'black'} />
                        </TouchableOpacity>
                    )
                }}
            />

            <View className="justify-center items-center">
                <Status status="Paid" isDetailed />
            </View>

            <InvoiceInfo />

            <InvoiceItemsSection />

            <TotalAmount />

            <InvoiceActions />
        </ScrollView>
    )
}