import { uploadImage } from "@/lib/actions";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity } from "react-native";

export default function UploadImageButton({ label }: { label: string }) {
    const [uploading, setUploading] = useState(false)

    const handleUpload = async () => {
        try {
            setUploading(true)

            await uploadImage()

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

    return (
        <TouchableOpacity
            className="w-40 h-14 justify-center items-center bg-sky-800 rounded-full"
            onPress={handleUpload}
            disabled={uploading}>
            {uploading ? <ActivityIndicator color={'white'} /> : <Text className="text-white">{label}</Text>}
        </TouchableOpacity>
    )
}