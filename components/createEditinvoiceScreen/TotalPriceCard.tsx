import { TouchableOpacity, View } from "react-native";
import Card from "../shared/Card";
import TextField from "../shared/TextField";

export default function TotalPriceCard() {
    return (
        <Card>
            <View className="flex-row justify-between items-center">
                <TextField text="Subtotal" type="secondary" />

                <TextField text="34,000" className="text-lg" />
            </View>

            <View className="flex-row justify-between items-center mt-2">
                <TextField text="Tax" type="secondary" />

                <TouchableOpacity>
                    <TextField text="Add tax" type="highlighted" />
                </TouchableOpacity>
            </View>

            <View className="my-2 border-b border-gray-400" />

            <View className="flex-row justify-between items-center">
                <TextField text="Total" className="font-bold text-lg" />

                <TextField text="34,000" className="font-bold text-lg" />
            </View>
        </Card>
    )
}