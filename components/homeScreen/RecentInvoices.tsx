import { Text, TouchableOpacity, View } from "react-native";
import InvoiceOverview from "../shared/InvoiceOverview";
import TextField from "../shared/TextField";

export default function RecentInvoices() {
    return (
        <View className="gap-7">
            <View className="flex-row justify-between">
                <TextField text="Recent invoices" className="font-bold text-xl" />

                <TouchableOpacity>
                    <Text className="font-bold text-xl text-blue-600">See all</Text>
                </TouchableOpacity>
            </View>

            <InvoiceOverview />

            <InvoiceOverview />

            <InvoiceOverview />

            <InvoiceOverview />
        </View>
    )
}