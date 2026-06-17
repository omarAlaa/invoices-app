import { Text, TouchableOpacity } from "react-native";

type Props = {
    label: string,
    pressed: boolean,
    onPress: () => void
}

export default function SignButton({ label, pressed, onPress }: Props) {
    return (
        <TouchableOpacity
            className={`flex-1 items-center justify-center rounded-full py-3 ${pressed ? 'bg-white dark:bg-zinc-600 border-[3px] border-blue-600 dark:border-sky-400' : ''}`}
            onPress={onPress}>
            <Text className='font-bold dark:text-white'>{label}</Text>
        </TouchableOpacity>
    )
}