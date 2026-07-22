import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import Avatar from "./Avatar";

export default function UserInfo() {
    const { firstName, lastName, avatarURL, avatarUri } = useAuthStore()
    const systemColorScheme = useColorScheme();

    return (
        <Link href="/profile" asChild>
            <TouchableOpacity className="flex-row items-center p-4 bg-white rounded-2xl dark:bg-zinc-800">
                <View className="flex-row items-center gap-2 mr-auto">
                    <Avatar
                        size="small"
                        firstName={firstName}
                        lastName={lastName}
                        url={avatarURL}
                        uri={avatarUri}
                    />

                    <Text className="font-bold text-xl dark:text-white">{firstName || lastName ? `${firstName || ''} ${lastName || ''}` : 'Complete your profile'}</Text>
                </View>

                <ChevronRight color={systemColorScheme === 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>
        </Link>
    )
}