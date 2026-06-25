import { View } from "react-native";
import Card from "../shared/Card";
import TextField from "../shared/TextField";

export default function ClientStatusCards() {
    return (
        <View className="flex-row justify-between">
            <Card>
                <TextField text="Invoiced" className="text-lg" type="secondary" />

                <TextField text="$11,940" className="font-bold text-lg" />
            </Card>

            <Card>
                <TextField text="Paid" className="text-lg" type="secondary" />

                <TextField text="$11,940" className="font-bold text-lg text-green-800 dark:text-green-800" />
            </Card>

            <Card>
                <TextField text="Owed" className="text-lg" type="secondary" />

                <TextField text="$11,940" className="font-bold text-lg text-red-800 dark:text-red-800" />
            </Card>
        </View>
    )
}