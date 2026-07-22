import { useAuthStore } from "@/store/useAuthStore";
import { useClientDraftStore } from "@/store/useClientDraftStore";
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

export const updateClientImage = async (id: string, imageURL: string) => {
    let { error } = await supabase
        .from('clients')
        .update({ image_url: imageURL, updated_at: new Date() })
        .eq('id', id)

    if (error) {
        throw error
    }
}

export const downloadImage = async (path: string, clientId?: string, isInvAvatar?: boolean) => {
    try {
        const { data, error } = await supabase.storage.from('avatars').createSignedUrl(path, 60 * 60)

        if (error) {
            throw error
        }

        if (isInvAvatar) {
            console.log('invavatar');
            return data.signedUrl;
        }

        if (clientId) {
            console.log('clientavatar');
            useClientDraftStore.getState().setAvatarUri(data.signedUrl)
        } else {
            console.log('useravatar');
            useAuthStore.getState().setAvatarUri(data.signedUrl)
        }

        return ''
    } catch (error: any) {
        console.log('Error downloading image: ', error.message)
        return ''
    }

}

export const uploadImage = async (clientId?: string) => {
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

    if (clientId) {
        await removeImageFromStorage(data.path, useClientDraftStore.getState().avatarURL, clientId)
        useClientDraftStore.getState().setAvatarURL(data.path)
    } else {
        await removeImageFromStorage(data.path, useAuthStore.getState().avatarURL || '')
        useAuthStore.getState().setAvatarURL(data.path)
    }
}

export const deleteImage = async (clientId?: string) => {
    if (clientId) {
        await removeImageFromStorage('', useClientDraftStore.getState().avatarURL, clientId)
        useClientDraftStore.getState().setAvatarURL('')
    } else {
        await removeImageFromStorage('', useAuthStore.getState().avatarURL || '')
        useAuthStore.getState().setAvatarURL('')
    }
}

const removeImageFromStorage = async (newPath: string, oldPath?: string, clientId?: string) => {
    const { error: deletingError } = await supabase
        .storage
        .from('avatars')
        .remove([oldPath || ''])

    if (deletingError) {
        throw deletingError;
    }

    if (clientId) {
        await updateClientImage(clientId, newPath)
        useClientDraftStore.getState().setAvatarUri('')
    } else {
        await updateProfile({
            avatar_url: newPath
        })
        useAuthStore.getState().setAvatarUri('')
    }
}