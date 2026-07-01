import InvoiceActions from "@/components/invoiceScreen/InvoiceActions";
import InvoiceInfo from "@/components/invoiceScreen/InvoiceInfo";
import InvoiceItemsSection from "@/components/invoiceScreen/InvoiceItemsSection";
import OptionsMenu from "@/components/invoiceScreen/OptionsMenu";
import TotalAmount from "@/components/invoiceScreen/TotalAmount";
import Status from "@/components/shared/Status";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

export default function Invoice() {
    const { invoiceId } = useLocalSearchParams()

    return (
        <ScrollView contentContainerClassName="pt-4 pb-16 px-8 gap-4">
            <Stack.Screen
                options={{
                    title: `Invoice #${invoiceId}`,
                    headerBackButtonDisplayMode: 'minimal',
                    headerShadowVisible: false,
                    headerRight: () => <OptionsMenu screen="invoice" />
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