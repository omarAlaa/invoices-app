import { deleteImage } from "@/lib/actions";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity } from "react-native";

export default function DeleteImageButton() {
    const [deleting, setDeleting] = useState(false)

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

                            await deleteImage()

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
        <TouchableOpacity
            className="w-40 h-14 justify-center items-center bg-red-500 rounded-full" onPress={handleDelete}>
            {deleting ? <ActivityIndicator color={'white'} /> : <Text className="text-white">Delete</Text>}
        </TouchableOpacity>
    )
}