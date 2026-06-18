import { View } from "react-native";
import TextField from "../shared/TextField";

type Props = {
    status: string,
    money: number
}

export default function StatusMoney({ status, money }: Props) {
    return (
        <View className="gap-2">
            <View className="flex-row items-center gap-2">
                <View className={`w-2 h-2 rounded-full ${status === 'Paid' ? 'bg-green-600' : status === 'Pending' ? 'bg-yellow-600' : 'bg-red-700'}`} />

                <TextField text={status} type="secondary" />
            </View>

            <TextField text={`EGP ${money}`} className="text-lg font-bold" />
        </View>
    )
}