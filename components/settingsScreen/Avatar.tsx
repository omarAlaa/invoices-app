import { downloadImage } from "@/lib/actions";
import { Image } from "expo-image";
import { User } from "lucide-react-native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    size: string;
    clientId?: string;
    firstName: string;
    lastName: string;
    url: string;
    uri?: string;
    isInvAvatar?: boolean;
}

export default function Avatar({ size, clientId, firstName, lastName, url, uri, isInvAvatar }: Props) {
    const [invUri, setInvUri] = useState('')

    useEffect(() => {
        const getImage = async () => {
            if (isInvAvatar) {
                setInvUri(await downloadImage(url, '', isInvAvatar))
            } else if (!uri) {
                downloadImage(url, clientId)
            }
        }

        if (url) {
            getImage()
        } else if (invUri) {
            console.log('emptying');

            setInvUri('')
        }
    }, [url])

    return (
        <View className={`bg-blue-200 rounded-full justify-center items-center ${size === 'small' ? 'h-[64px] w-[64px]' : size === 'xs' ? 'h-[48px] w-[48px]' : 'h-[112px] w-[112px]'}`}>
            {uri || invUri ?
                <Image
                    source={{ uri: invUri ? invUri : uri }}
                    style={size === 'small' ? styles.smallAvatar : size === 'xs' ? styles.xsAvatar : styles.largeAvatar}
                    contentFit="cover"
                    transition={200}
                />
                :
                firstName || lastName ?
                    <Text className={`font-bold ${size === 'large' ? 'text-3xl' : 'text-xl'} color-blue-600`}>{`${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()}</Text>
                    :
                    <User />}
        </View>
    )
}

const styles = StyleSheet.create(
    {
        xsAvatar: {
            width: 48,
            height: 48,
            borderRadius: 24
        },

        smallAvatar: {
            width: 64,
            height: 64,
            borderRadius: 32
        },

        largeAvatar: {
            width: 112,
            height: 112,
            borderRadius: 56
        }
    }
)