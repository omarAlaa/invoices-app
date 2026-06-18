import { TouchableOpacity, View } from "react-native";
import InvoiceOverview from "../shared/InvoiceOverview";
import TextField from "../shared/TextField";

export default function RecentInvoices() {
    return (
        <View className="gap-6">
            <View className="flex-row justify-between">
                <TextField text="Recent invoices" className="font-bold text-xl" />

                <TouchableOpacity>
                    <TextField text="See all" className="font-bold text-xl text-blue-600" />
                </TouchableOpacity>
            </View>

            <InvoiceOverview />

            <InvoiceOverview />

            <InvoiceOverview />

            <InvoiceOverview />
        </View>
    )
}