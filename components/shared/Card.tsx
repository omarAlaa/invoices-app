import { View } from "react-native";

interface Props extends React.PropsWithChildren {
    className?: string,
}

export default function Card({ className, children }: Props) {
    return (
        <View className={`p-4 bg-zinc-200 dark:bg-zinc-800 rounded-xl ${className}`}>
            {children}
        </View>
    )
}