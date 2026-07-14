import { formatCurrency } from "@/lib/utils";
import { View } from "react-native";
import TextField from "../shared/TextField";

type Props = {
    status: string;
    amount: number | undefined;
}

export default function StatusMoney({ status, amount }: Props) {
    return (
        <View className="gap-2">
            <View className="flex-row items-center gap-2">
                <View className={`w-2 h-2 rounded-full ${status === 'Paid' ? 'bg-green-600' : status === 'Pending' ? 'bg-yellow-600' : 'bg-red-700'}`} />

                <TextField text={status} type="secondary" />
            </View>

            <TextField text={formatCurrency(amount)} className="text-lg font-bold" />
        </View>
    )
}