import { ChevronRight, LockKeyhole } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function ChangePassword() {
    return (
        <TouchableOpacity className="flex-row pl-2 py-3">
            <View className="flex-row gap-2 mr-auto">
                <LockKeyhole />
                <Text className="font-bold text-lg">Change password</Text>
            </View>

            <ChevronRight />
        </TouchableOpacity>
    )
}