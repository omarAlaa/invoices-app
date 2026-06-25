import TextField from "@/components/shared/TextField";
import React from "react";
import { View } from "react-native";

interface Props extends React.PropsWithChildren {
    title: string,
}

export default function Header({ title, children }: Props) {
    return (
        <View className="flex-row justify-between items-center">
            <TextField text={title} className="text-3xl font-bold" />

            <View className="flex-row gap-8">
                {children}
            </View>
        </View>
    )
}