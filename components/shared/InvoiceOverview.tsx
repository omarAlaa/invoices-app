import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Status from "./Status";
import TextField from "./TextField";

export default function InvoiceOverview() {
    return (
        <Link
            href={{
                pathname: '/[invoiceId]',
                params: { invoiceId: 'INV-0042' }
            }}
            asChild>
            <TouchableOpacity className="flex-row justify-between">
                <View className="flex-row gap-2 items-center">
                    <View className="w-12 h-12 rounded-full bg-blue-200 justify-center items-center">
                        <Text className="font-bold text-xl text-blue-600">OA</Text>
                    </View>

                    <View>
                        <TextField text="Nova Media" className="font-bold text-lg" />

                        <TextField text="#INV-0042 · Due Jun 18" type="secondary" />
                    </View>
                </View>

                <View className="justify-center items-end">
                    <TextField text="EGP 2400" className="font-bold text-lg" />

                    {/* <View className="bg-green-200 px-3 py-1 rounded-full">
                    <Text className="text-green-500">Paid</Text>
                </View> */}

                    {/* <View className="bg-yellow-200 px-3 py-1 rounded-full">
                    <Text className="text-yellow-700">Pending</Text>
                </View> */}

                    <Status status="Pending" />
                </View>
            </TouchableOpacity>
        </Link>
    )
}