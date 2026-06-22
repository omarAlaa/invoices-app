import { Text, View } from "react-native";
import Card from "../shared/Card";
import TextField from "../shared/TextField";

export default function InvoiceInfo() {
    return (
        <Card>
            <View className="flex-row gap-2 items-center">
                <View className="w-12 h-12 rounded-full bg-blue-200 justify-center items-center">
                    <Text className="font-bold text-xl text-blue-600">OA</Text>
                </View>

                <View>
                    <TextField text="Omar Alaa" className="font-bold text-lg" />

                    <TextField text="billing@novamedia.com" type="secondary" />
                </View>
            </View>

            <View className="my-8 border-b border-gray-400" />

            <View className="flex-row justify-between">
                <View>
                    <TextField text="Issued" type="secondary" />

                    <TextField text="Jun 4, 2026" className="font-bold text-lg" />
                </View>

                <View>
                    <TextField text="Due" type="secondary" />

                    <TextField text="Jun 4, 2026" className="font-bold text-lg" />
                </View>

                <View>
                    <TextField text="Terms" type="secondary" />

                    <TextField text="Net 14" className="font-bold text-lg" />
                </View>
            </View>
        </Card>
    )
}