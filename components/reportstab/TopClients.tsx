import { View } from "react-native";
import TextField from "../shared/TextField";

export default function TopClients() {
    return (
        <View className="gap-1">
            <TextField text="Top clients" className="font-bold text-lg" />

            <View className="gap-2">
                <View className="flex-row justify-between items-center py-2">
                    <TextField text="1. Nova Midea" className="text-lg" />

                    <TextField text="3,200" className="font-bold" />
                </View>

                <View className="border-b border-gray-400" />

                <View className="flex-row justify-between items-center py-2">
                    <TextField text="2. Nova Midea" className="text-lg" />

                    <TextField text="3,200" className="font-bold" />
                </View>

                <View className="border-b border-gray-400" />

                <View className="flex-row justify-between items-center py-2">
                    <TextField text="3. Nova Midea" className="text-lg" />

                    <TextField text="3,200" className="font-bold" />
                </View>
            </View>
        </View>
    )
}