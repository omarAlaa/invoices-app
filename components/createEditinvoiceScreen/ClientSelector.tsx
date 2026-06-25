import { ChevronDown } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import TextField from '../shared/TextField';

type Props = {
    name: string | null;
    onPress: () => void;
};

export function ClientSelector({ name, onPress }: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row justify-between items-center p-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-800"
        >
            {name ?
                <View className="flex-row items-center gap-2">
                    <View className="w-12 h-12 rounded-full bg-blue-200 justify-center items-center">
                        <Text className="font-bold text-xl text-blue-600">{name[0]}</Text>
                    </View>

                    <TextField text={name} className='font-bold text-lg' />
                </View>
                :
                <TextField text='Select a client' type='secondary' />
            }
            <ChevronDown color="#9CA3AF" />
        </TouchableOpacity>
    )
}