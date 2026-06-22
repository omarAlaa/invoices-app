import { View } from "react-native";
import TextField from "../shared/TextField";

export default function TotalAmount() {
    return (
        <View className="gap-2">
            <View className="flex-row justify-between">
                <TextField text="Subtotal" type="secondary" className="text-lg" />

                <TextField text="$2,200.00" className="text-lg" />
            </View>

            <View className="flex-row justify-between">
                <TextField text="Tax (10%)" type="secondary" className="text-lg" />

                <TextField text="$220.00" className="text-lg" />
            </View>

            <View className="my-4 border-b border-gray-400" />

            <View className="flex-row justify-between">
                <TextField text="Total" className="font-bold text-xl" />

                <TextField text="$2,420.00" className="font-bold text-xl" />
            </View>
        </View>
    )
}