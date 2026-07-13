import { InvoiceItem } from "@/lib/definitons";
import { formatCurrency } from "@/lib/utils";
import { View } from "react-native";
import TextField from "../shared/TextField";

type Props = {
    item: InvoiceItem;
}

export default function InvItem({ item }: Props) {
    return (
        <View className="flex-row justify-between items-baseline">
            <View>
                <TextField text={item.title} className="font-bold text-lg" />

                <TextField text={`${item.quantity} × $${item.rate}`} type="secondary" />
            </View>

            <TextField text={formatCurrency(item.amount)} className="font-bold text-lg" />
        </View>
    )
}