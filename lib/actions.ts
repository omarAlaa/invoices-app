import { useAuthStore } from "@/store/useAuthStore";
import * as ImagePicker from 'expo-image-picker';
import { Alert } from "react-native";
import { supabase } from "./supabase";

interface UpdateProfilePayload {
    first_name?: string;
    last_name?: string;
    avatar_url?: string | null;
}

export const getProfile = async (userId: string) => {
    try {
        let { data, error, status } = await supabase
            .from('profiles')
            .select(`first_name, last_name, avatar_url`)
            .eq('id', userId)
            .single()
        if (error && status !== 406) {
            throw error
        }
        if (data) {
            useAuthStore.getState().setInfo(data.first_name, data.last_name, data.avatar_url)
        }
    } catch (error) {
        if (error instanceof Error) {
            Alert.alert(error.message)
        }
    }
}

export const updateProfile = async (payLoad: UpdateProfilePayload) => {
    let { error } = await supabase
        .from('profiles')
        .update({ ...payLoad, updated_at: new Date() })
        .eq('id', useAuthStore.getState().userId)

    if (error) {
        throw error
    }
}

export const downloadImage = async (path: string) => {
    try {
        const { data, error } = await supabase.storage.from('avatars').download(path)

        if (error) {
            throw error
        }

        const fr = new FileReader()
        fr.readAsDataURL(data)
        fr.onload = () => {
            useAuthStore.getState().setAvatarUri(fr.result as string)
        }
    } catch (error: any) {
        console.log('Error downloading image: ', error.message)
    }
}

export const uploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: false,
        allowsEditing: true,
        quality: 1,
        exif: false,
    })

    if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log('User cancelled image picker.')
        return
    }

    const image = result.assets[0]

    if (!image.uri) {
        throw new Error('No image uri!')
    }

    const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer())
    const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg'
    const path = `${useAuthStore.getState().userId}/${Date.now()}.${fileExt}`

    const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, arraybuffer, {
            contentType: image.mimeType ?? 'image/jpeg',
        })

    if (uploadError) {
        throw uploadError
    }

    await removeImageFromStorage(data.path)

    useAuthStore.getState().setAvatarURL(data.path)
}

export const deleteImage = async () => {
    await removeImageFromStorage('')

    useAuthStore.getState().setAvatarURL(null)
}

const removeImageFromStorage = async (path: string) => {
    const { error: deletingError } = await supabase
        .storage
        .from('avatars')
        .remove([useAuthStore.getState().avatarURL || ''])

    if (deletingError) {
        throw deletingError;
    }

    await updateProfile({
        avatar_url: path
    })

    useAuthStore.getState().setAvatarUri(null)
}