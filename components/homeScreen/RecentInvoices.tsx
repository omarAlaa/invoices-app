import { Link } from "expo-router";
import { View } from "react-native";
import InvoiceOverview from "../shared/InvoiceOverview";
import TextField from "../shared/TextField";

export default function RecentInvoices() {
    return (
        <View className="gap-7">
            <View className="flex-row justify-between">
                <TextField text="Recent invoices" className="font-bold text-xl" />

                <Link href='/(app)/invoices' className="font-bold text-xl text-blue-600">
                    See all
                </Link>
            </View>

            <InvoiceOverview />

            <InvoiceOverview />

            <InvoiceOverview />

            <InvoiceOverview />
        </View>
    )
}