import { useAuthStore } from "@/store/useAuthStore";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import Avatar from "../settingsScreen/Avatar";
import TextField from "../shared/TextField";

export default function GreetingsSection() {
    const handleAvatarPress = () => {
        router.navigate("/settings")

        setTimeout(() => {
            router.push("/settings/profile")
        }, 0)
    }

    const { firstName, lastName } = useAuthStore()
    return (
        <View className="flex-row justify-between items-center">
            <View>
                <TextField text="Welcome back" type="secondary" className="text-xl" />

                <TextField text={`${firstName || ''} ${lastName || ''}`} className="text-2xl font-bold" />
            </View>

            <TouchableOpacity onPress={handleAvatarPress}>
                <Avatar size="small" />
            </TouchableOpacity>
        </View>
    )
}