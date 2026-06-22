import { View } from "react-native";
import Card from "../shared/Card";
import TextField from "../shared/TextField";
import StatusMoney from "./StatusMoney";

export default function Outstanding() {
    return (
        <Card>
            <TextField text="Total outstanding" type="secondary" className="text-xl" />

            <TextField text="EGP 20,000" className="text-4xl font-bold mt-2" />

            <View className="my-8 border-b border-gray-400" />

            <View className="flex-row justify-between">
                <StatusMoney status="Paid" money={8200} />

                <StatusMoney status="Pending" money={2200} />

                <StatusMoney status="Overdue" money={5200} />
            </View>
        </Card>
    )
}