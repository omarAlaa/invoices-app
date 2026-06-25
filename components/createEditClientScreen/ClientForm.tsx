import { View } from "react-native";
import InputField from "../shared/InputField";
import TextField from "../shared/TextField";

export default function ClientForm() {
    return (
        <View className="gap-4">
            <View className="gap-2">
                <TextField text="First name" type="secondary" />

                <InputField />
            </View>

            <View className="gap-2">
                <TextField text="Last name" type="secondary" />

                <InputField />
            </View>

            <View className="gap-2">
                <TextField text="Email" type="secondary" />

                <InputField type="email" />
            </View>

            <View className="gap-2">
                <TextField text="Phone" type="secondary" />

                <InputField type="tel" />
            </View>
        </View>
    )
}