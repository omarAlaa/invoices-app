import { downloadImage } from "@/lib/actions";
import { useAuthStore } from "@/store/useAuthStore";
import { useClientDraftStore } from "@/store/useClientDraftStore";
import { Image } from "expo-image";
import { User } from "lucide-react-native";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    size: string;
    clientId?: string;
}

export default function Avatar({ size, clientId }: Props) {
    const { firstName, lastName, avatarURL, avatarUri } = clientId ? useClientDraftStore() : useAuthStore()

    useEffect(() => {
        if (avatarURL && !avatarUri) {
            downloadImage(avatarURL, clientId)
        }
    }, [avatarURL])

    return (
        <View className={`bg-blue-200 rounded-full justify-center items-center ${size === 'small' ? 'h-16 w-16' : 'h-28 w-28'}`}>
            {avatarUri ?
                <Image source={{ uri: avatarUri }} style={size === 'small' ? styles.smallAvatar : styles.largeAvatar} />
                :
                firstName || lastName ?
                    <Text className="font-bold text-3xl color-blue-600">{`${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()}</Text>
                    :
                    <User />}
        </View>
    )
}

const styles = StyleSheet.create(
    {
        smallAvatar: {
            width: 56,
            height: 56,
            borderRadius: 28
        },

        largeAvatar: {
            width: 112,
            height: 112,
            borderRadius: 56
        }
    }
)