import { Link } from "expo-router";
import { ChevronRight, LockKeyhole } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function ChangePasswordLink() {
    return (
        <Link href="/(app)/settings/changePasswordScreen" asChild>
            <TouchableOpacity className="flex-row pl-2 py-3">
                <View className="flex-row gap-2 mr-auto">
                    <LockKeyhole />
                    <Text className="font-bold text-lg">Change password</Text>
                </View>

                <ChevronRight />
            </TouchableOpacity>
        </Link>
    )
}