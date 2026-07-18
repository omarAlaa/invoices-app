import { Text, View } from "react-native";

type Props = {
    status: string | undefined,
    date?: string | undefined;
    isDetailed?: boolean,
}

export default function Status({ status, date, isDetailed }: Props) {
    let text, bgColor, textColor

    if (status === 'paid') {
        text = isDetailed ? `Paid on ${date}` : 'Paid'
        bgColor = 'bg-green-200'
        textColor = 'text-green-500'
    } else if (status === 'pending') {
        text = isDetailed ? `Pending due ${date}` : 'Pending'
        bgColor = 'bg-yellow-200'
        textColor = 'text-yellow-700'
    } else {
        text = isDetailed ? `Overdue since ${date}` : 'Overdue'
        bgColor = 'bg-red-200'
        textColor = 'text-red-700'
    }

    return (
        <View className={`px-4 py-0.5 rounded-full ${bgColor}`}>
            <Text className={`font-bold text-lg ${textColor}`}>{text}</Text>
        </View>
    )
}