import { View } from "react-native";

type Props = React.PropsWithChildren

export default function Card({ children }: Props) {
    return (
        <View className="p-6 bg-gray-200 dark:bg-zinc-800 rounded-xl">
            {children}
        </View>
    )
}