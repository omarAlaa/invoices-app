import { Text, View } from "react-native";

type Props = {
    status: string,
    isDetailed?: boolean,
}

export default function Status({ status, isDetailed }: Props) {
    let text, bgColor, textColor

    if (status === 'Paid') {
        text = isDetailed ? 'Paid on 12 JUN' : status
        bgColor = 'bg-green-200'
        textColor = 'text-green-500'
    } else if (status === 'Pending') {
        text = isDetailed ? 'Pending due' : status
        bgColor = 'bg-yellow-200'
        textColor = 'text-yellow-700'
    } else {
        text = isDetailed ? 'Overdue since' : status
        bgColor = 'bg-red-200'
        textColor = 'text-red-700'
    }

    return (
        <View className={`px-3 py-1 rounded-full ${bgColor}`}>
            <Text className={`font-bold text-lg ${textColor}`}>{text}</Text>
        </View>
    )
}