import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import Avatar from "../settingsScreen/Avatar";
import TextField from "../shared/TextField";

export default function GreetingsSection() {
    const { firstName, lastName } = useAuthStore()
    return (
        <View className="flex-row justify-between items-center">
            <View>
                <TextField text="Welcome back" type="secondary" className="text-xl" />

                <TextField text={`${firstName || ''} ${lastName || ''}`} className="text-2xl font-bold" />
            </View>

            <Link href='/profile' asChild>
                <TouchableOpacity>
                    <Avatar size="small" />
                </TouchableOpacity>
            </Link>
        </View>
    )
}