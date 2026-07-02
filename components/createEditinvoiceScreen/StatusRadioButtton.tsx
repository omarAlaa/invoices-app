import { Check, Clock, ClockAlert } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
    title: string,
    selected: string,
    setSelected: (title: string) => void,
}

export default function StatusRadioButton({ title, selected, setSelected }: Props) {
    return (
        <TouchableOpacity className="flex-row gap-2 items-center" onPress={() => setSelected(title)}>
            <View className={`items-center justify-center w-6 h-6 rounded-full ${selected === title ? 'bg-gray-600' : 'bg-gray-300'}`}>
                <View className={`w-2 h-2 rounded-full ${selected === title ? 'bg-white' : 'bg-gray-300'}`} />
            </View>

            <View className={`flex-row items-center gap-2 px-4 py-2 rounded-full ${title === 'Paid' ? 'bg-green-600' : title === 'Overdue' ? 'bg-red-700' : 'bg-yellow-600'}`}>
                <Text className="text-white">{title}</Text>

                {title === 'Pending' ?
                    <Clock size={18} color='white' />
                    :
                    title === 'Paid' ?
                        <Check size={18} color='white' />
                        :
                        <ClockAlert size={18} color='white' />
                }
            </View>
        </TouchableOpacity>
    )
}