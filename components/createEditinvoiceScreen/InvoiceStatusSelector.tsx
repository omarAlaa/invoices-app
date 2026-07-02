import { useState } from "react";
import { View } from "react-native";
import TextField from "../shared/TextField";
import StatusRadioButton from "./StatusRadioButtton";

export default function InvoiceStatusSelector() {
    const [selected, setSelected] = useState('Pending')

    return (
        <View className="gap-4">
            <TextField text="Status" type="secondary" />

            <View className="gap-6">
                <StatusRadioButton title="Pending" selected={selected} setSelected={setSelected} />

                <StatusRadioButton title="Paid" selected={selected} setSelected={setSelected} />

                <StatusRadioButton title="Overdue" selected={selected} setSelected={setSelected} />
            </View>
        </View>
    )
}