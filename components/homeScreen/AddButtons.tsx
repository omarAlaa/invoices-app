import { Plus, UserPlus } from "lucide-react-native";
import { Text, View, useColorScheme } from "react-native";
import ActionButton from "../shared/ActionButton";
import TextField from "../shared/TextField";

export default function AddButtons() {
    const systemColorScheme = useColorScheme()
    return (
        <View className="flex-row gap-2">
            <ActionButton>
                <Plus color='#2563eb' />

                <Text className="text-blue-600 font-bold text-lg">New invoice</Text>
            </ActionButton>

            <ActionButton isSecondary={true}>
                <UserPlus color={systemColorScheme === 'dark' ? 'white' : 'black'} />

                <TextField text="Add client" className="font-bold text-lg dark:text-gray-400" />
            </ActionButton>
        </View>
    )
}