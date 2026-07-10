import { View } from "react-native";
import TextField from "../shared/TextField";
import StatusRadioButton from "./StatusRadioButtton";

export default function InvoiceStatusSelector() {
    return (
        <View className="gap-4">
            <TextField text="Status" type="secondary" />

            <View className="gap-6">
                <StatusRadioButton status="pending" />

                <StatusRadioButton status="paid" />

                <StatusRadioButton status="overdue" />
            </View>
        </View>
    )
}