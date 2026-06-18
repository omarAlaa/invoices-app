import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type Props = {
    label: string,
    loading: boolean,
    bttnDisabled: boolean,
    redBttn?: boolean,
    smallBttn?: boolean,
    onPress: () => void,
}

export default function SettingsButton({ label, loading, bttnDisabled, redBttn, smallBttn, onPress }: Props) {
    return (
        <TouchableOpacity
            className={`flex-row gap-2 justify-center items-center rounded-full ${smallBttn ? 'w-40 h-14' : 'p-4'} ${redBttn ? 'bg-red-500' : 'bg-sky-800'} ${bttnDisabled && !loading ? 'opacity-40' : ''}`}
            disabled={bttnDisabled}
            onPress={onPress}>
            <Text className='color-white font-bold text-xl'>{label}</Text>

            {loading && <ActivityIndicator color={'white'} />}
        </TouchableOpacity>
    )
}