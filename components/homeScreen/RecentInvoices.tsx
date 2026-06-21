import { Link } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import InvoiceOverview from "../shared/InvoiceOverview";
import TextField from "../shared/TextField";

export default function RecentInvoices() {
    return (
        <View className="flex-1 gap-7 mb-[-4rem]">
            <View className="flex-row justify-between">
                <TextField text="Recent invoices" className="font-bold text-xl" />

                <Link href='/(app)/invoices' asChild>
                    <TouchableOpacity>
                        <Text className="font-bold text-xl text-blue-600">See all</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            <ScrollView contentContainerClassName="gap-7 pb-11" showsVerticalScrollIndicator={false}>
                <InvoiceOverview />

                <InvoiceOverview />

                <InvoiceOverview />

                <InvoiceOverview />
            </ScrollView>
        </View>
    )
}