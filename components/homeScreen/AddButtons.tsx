import { Plus, UserPlus } from "lucide-react-native";
import { Text, View } from "react-native";
import ActionButton from "../shared/ActionButton";

export default function AddButtons() {
    return (
        <View className="flex-row gap-2">
            <ActionButton>
                <Plus color='#2563eb' />

                <Text className="text-blue-600 font-bold text-lg">New invoice</Text>
            </ActionButton>

            <ActionButton isSecondary={true}>
                <UserPlus />

                <Text className="font-bold text-lg">Add client</Text>
            </ActionButton>
        </View>
    )
}