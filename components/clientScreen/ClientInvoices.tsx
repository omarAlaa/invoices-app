import InvoiceOverview from "@/components/shared/InvoiceOverview";
import { useScrollFAB } from "@/hooks/useScrollFAB";
import { View } from "react-native";
import TextField from "../shared/TextField";

export default function CLientInvoices() {
    const { scrollHandler, buttonStyle } = useScrollFAB()

    return (
        <View className="flex-1 gap-2">
            <TextField text="Invoices" className="font-bold text-lg" />

            <View className="gap-7">
                {Array.from({ length: 20 }).map((_, index) => (
                    <InvoiceOverview key={index} />
                ))}
            </View>
        </View>
    )
}