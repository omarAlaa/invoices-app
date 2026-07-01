import { PropsWithChildren } from "react";
import { View } from "react-native";

interface Props extends PropsWithChildren {
    screen: string,
}

export default function ItemsList({ children }: Props) {
    return (
        <View className="flex-1 mb-[-4rem]">
            <View className="gap-7 pb-11">
                {children}
            </View>
        </View>
    )
}