import { Text, TouchableOpacity } from "react-native";

type Props = {
    label: string,
    pressed: boolean,
    onPress: () => void
}

export default function SignButton({ label, pressed, onPress }: Props) {
    return (
        <TouchableOpacity
            className={`flex-1 items-center justify-center rounded-full py-3 ${pressed ? 'bg-white border-[3px] border-blue-600' : ''}`}
            onPress={onPress}>
            <Text className='font-bold'>{label}</Text>
        </TouchableOpacity>
    )
}