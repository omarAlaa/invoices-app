import { Text, View } from "react-native";
import ChangePassword from "./ChangePasswordLink";
import SignOut from './SignOut';

export default function AccountOptions() {
    return (
        <View className="gap-4 bg-white rounded-2xl p-2 dark:bg-zinc-800">
            <Text className="color-gray-500 font-medium text-lg dark:text-zinc-400">Account</Text>

            <View>
                <ChangePassword />

                <SignOut />
            </View>
        </View>
    )
}