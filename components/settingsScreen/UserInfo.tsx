import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import Avatar from "./Avatar";

export default function UserInfo() {
    const { firstName, lastName } = useAuthStore()

    return (
        <Link href="/(app)/settings/profile" asChild>
            <TouchableOpacity className="flex-row items-center p-4 bg-white rounded-2xl">
                <View className="flex-row items-center gap-2 mr-auto">
                    <Avatar size="small" />

                    <Text className="font-bold text-xl">{firstName || lastName ? `${firstName || ''} ${lastName || ''}` : 'Complete your profile'}</Text>
                </View>

                <ChevronRight />
            </TouchableOpacity>
        </Link>
    )
}