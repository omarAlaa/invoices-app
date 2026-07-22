import Avatar from "@/components/settingsScreen/Avatar";
import { deleteImage, uploadImage } from "@/lib/actions";
import { useAuthStore } from "@/store/useAuthStore";
import { useClientDraftStore } from "@/store/useClientDraftStore";
import { useState } from "react";
import { Alert, View } from "react-native";
import SettingsButton from "./SettingsButton";

type Props = {
    clientId?: string;
    isNewClient?: boolean;
}

export default function AvatarController({ clientId, isNewClient }: Props) {
    const { firstName, lastName, avatarURL, avatarUri } = clientId ? useClientDraftStore() : !isNewClient ? useAuthStore() : { firstName: '', lastName: '', avatarURL: '', avatarUri: '' }
    const [uploading, setUploading] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const handleUpload = async () => {
        try {
            setUploading(true)

            await uploadImage(clientId)

        } catch (error: any) {
            if (error) {
                Alert.alert(error.message)
            } else {
                throw error
            }
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async () => {
        Alert.alert(
            "Delete Image",
            "Are you sure you want to delete your profile picture?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setDeleting(true)

                            await deleteImage(clientId)

                        } catch (error: any) {
                            if (error) {
                                Alert.alert("Error", error.message)
                            } else {
                                throw error
                            }
                        } finally {
                            setDeleting(false)
                        }
                    }
                }
            ]
        )
    }

    return (
        <View className="items-center gap-4">
            <Avatar
                size='large'
                clientId={clientId}
                firstName={firstName}
                lastName={lastName}
                url={avatarURL}
                uri={avatarUri}
            />

            <View className="flex-row gap-4">
                <SettingsButton
                    label={avatarURL ? 'Change' : 'Upload'}
                    loading={uploading}
                    bttnDisabled={uploading}
                    smallBttn={true}
                    onPress={handleUpload} />

                {avatarURL &&
                    <SettingsButton
                        label="Delete"
                        loading={deleting}
                        bttnDisabled={deleting}
                        redBttn={true}
                        smallBttn={true}
                        onPress={handleDelete} />}
            </View>
        </View>
    )
}