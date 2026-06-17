import { Link } from "expo-router";
import { ChevronRight, LockKeyhole } from "lucide-react-native";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";

export default function ChangePasswordLink() {
    const systemColorScheme = useColorScheme();

    return (
        <Link href="/(app)/settings/changePasswordScreen" asChild>
            <TouchableOpacity className="flex-row pl-2 py-3">
                <View className="flex-row gap-2 mr-auto">
                    <LockKeyhole color={systemColorScheme === 'dark' ? 'white' : 'black'} />
                    <Text className="font-bold text-lg dark:text-white">Change password</Text>
                </View>

                <ChevronRight color={systemColorScheme === 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>
        </Link>
    )
}