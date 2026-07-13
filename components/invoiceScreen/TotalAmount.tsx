import { formatCurrency } from "@/lib/utils";
import { View } from "react-native";
import TextField from "../shared/TextField";

type Props = {
    subtotal: number | undefined;
    taxRate: number | undefined;
    taxAmount: number | undefined;
    total: number | undefined;
}

export default function TotalAmount({ subtotal, taxRate, taxAmount, total }: Props) {
    return (
        <View className="gap-2">
            <View className="flex-row justify-between">
                <TextField text="Subtotal" type="secondary" className="text-lg" />

                <TextField text={formatCurrency(subtotal)} className="text-lg" />
            </View>

            <View className="flex-row justify-between">
                <TextField text={`Tax (${taxRate}%)`} type="secondary" className="text-lg" />

                <TextField text={formatCurrency(taxAmount)} className="text-lg" />
            </View>

            <View className="my-4 border-b border-gray-400" />

            <View className="flex-row justify-between">
                <TextField text="Total" className="font-bold text-xl" />

                <TextField text={formatCurrency(total)} className="font-bold text-xl" />
            </View>
        </View>
    )
}