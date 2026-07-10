import { Text, View } from "react-native";

type Props = {
    status: string,
    isDetailed?: boolean,
}

export default function Status({ status, isDetailed }: Props) {
    let text, bgColor, textColor

    if (status === 'paid') {
        text = isDetailed ? 'Paid on 12 JUN' : 'Paid'
        bgColor = 'bg-green-200'
        textColor = 'text-green-500'
    } else if (status === 'pending') {
        text = isDetailed ? 'Pending due' : 'Pending'
        bgColor = 'bg-yellow-200'
        textColor = 'text-yellow-700'
    } else {
        text = isDetailed ? 'Overdue since' : 'Overdue'
        bgColor = 'bg-red-200'
        textColor = 'text-red-700'
    }

    return (
        <View className={`px-4 py-0.5 rounded-full ${bgColor}`}>
            <Text className={`font-bold text-lg ${textColor}`}>{text}</Text>
        </View>
    )
}