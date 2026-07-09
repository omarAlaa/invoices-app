import { View } from "react-native";
import Card from "../shared/Card";
import TextField from "../shared/TextField";

export default function StatsCard() {
    return (
        <View className="gap-2">
            <View className="flex-row justify-between gap-4">
                <Card >
                    <TextField text="Revenue" type="secondary" />

                    <TextField text="$8,920" className="font-bold text-lg" />
                </Card>

                <Card >
                    <TextField text="Outstanding" type="secondary" />

                    <TextField text="$8,920" className="font-bold text-lg" />
                </Card>
            </View>

            <View className="flex-row justify-between gap-4">
                <Card >
                    <TextField text="Invoices sent" type="secondary" />

                    <TextField text="$8,920" className="font-bold text-lg" />
                </Card>

                <Card >
                    <TextField text="Avg. value" type="secondary" />

                    <TextField text="$8,920" className="font-bold text-lg" />
                </Card>
            </View>
        </View>
    )
}