import { Text, TouchableOpacity } from "react-native";

type Props = {
    label: string,
    onPress: () => void,
    filterSelected: string
}

export default function StatusChip({ label, onPress, filterSelected }: Props) {
    return (
        <TouchableOpacity
            className={`px-6 py-3 rounded-full ${filterSelected === label ? 'bg-blue-200 dark:bg-blue-950' : 'bg-white dark:bg-zinc-900'}`}
            onPress={onPress}>
            <Text className={`font-bold ${filterSelected === label ? 'text-blue-600' : 'dark:text-gray-400'}`}>
                {label.charAt(0).toUpperCase() + label.slice(1)}
            </Text>
        </TouchableOpacity>
    )
}