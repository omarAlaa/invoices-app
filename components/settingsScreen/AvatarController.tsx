import Avatar from "@/components/settingsScreen/Avatar";
import DeleteImageButton from "@/components/settingsScreen/DeleteImageButton";
import UploadImageButton from "@/components/settingsScreen/UploadImageButton";
import { useAuthStore } from "@/store/useAuthStore";
import { View } from "react-native";

export default function AvatarController() {
    const { avatarURL } = useAuthStore()

    return (
        <View className="items-center gap-4">
            <Avatar size='large' />

            <View className="flex-row gap-4">
                <UploadImageButton label={avatarURL ? 'Change' : 'Upload'} />

                {avatarURL && <DeleteImageButton />}
            </View>
        </View>
    )
}