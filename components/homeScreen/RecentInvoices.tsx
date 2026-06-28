import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import InvoiceOverview from "../shared/InvoiceOverview";
import TextField from "../shared/TextField";

export default function RecentInvoices() {
    return (
        <View className="flex-1 gap-7 mb-[-4rem]">
            <View className="flex-row justify-between">
                <TextField text="Recent invoices" className="font-bold text-xl" />

                <Link href='/invoices' asChild>
                    <TouchableOpacity>
                        <TextField text="See all" type="highlighted" />
                    </TouchableOpacity>
                </Link>
            </View>

            <InvoiceOverview />

            <InvoiceOverview />

            <InvoiceOverview />

            <InvoiceOverview />
        </View>
    )
}