import { View } from "react-native";
import TextField from "../shared/TextField";

export default function InvoiceItem() {
    return (
        <View className="flex-row justify-between items-baseline">
            <View>
                <TextField text="Brand strategy session" className="font-bold text-lg" />

                <TextField text="8 hrs × $150.00" type="secondary" />
            </View>

            <TextField text="$1,200.00" className="font-bold text-lg" />
        </View>
    )
}