import AccountOptions from "@/components/settingsScreen/AccountOptions"
import UserInfo from "@/components/settingsScreen/UserInfo"
import { View } from "react-native"

export default function Settings() {
    return (
        <View className="pt-8 px-6 gap-6">
            <UserInfo />

            <AccountOptions />
        </View>
    )
}