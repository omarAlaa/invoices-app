import TextField from "@/components/shared/TextField";
import { Text, View } from "react-native";

export default function ClientInfo() {
    return (
        <View className="items-center">
            <View className="w-20 h-20 rounded-full bg-blue-200 justify-center items-center">
                <Text className="font-bold text-3xl text-blue-600">OA</Text>
            </View>

            <TextField text="billing@novamedia.com" type="secondary" className="text-lg" />

            <TextField text="+1 (212) 555-0148" type="secondary" className="text-lg" />
        </View>
    )
}