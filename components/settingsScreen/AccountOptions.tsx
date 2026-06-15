import { Text, View } from "react-native";
import ChangePassword from "./ChangePassword";
import SignOut from './SignOut';

export default function AccountOptions() {
    return (
        <View className="gap-4 bg-white rounded-2xl p-2">
            <Text className="color-gray-500 font-medium text-lg">Account</Text>

            <View>
                <ChangePassword />

                <SignOut />
            </View>
        </View>
    )
}