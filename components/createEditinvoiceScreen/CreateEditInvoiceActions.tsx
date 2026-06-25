import { Text, View } from "react-native";
import ActionButton from "../shared/ActionButton";
import TextField from "../shared/TextField";

export default function CreateEditInvoiceActions() {
    return (
        <View className="flex-row gap-2 p-2">
            <ActionButton isSecondary>
                <TextField text="Save as draft" className="font-bold text-lg" />
            </ActionButton>

            <ActionButton>
                <Text className="text-blue-600 font-bold text-lg">Send invoice</Text>
            </ActionButton>
        </View>
    )
}