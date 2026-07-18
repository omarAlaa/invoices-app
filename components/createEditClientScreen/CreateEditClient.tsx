import ClientForm from "@/components/createEditClientScreen/ClientForm";
import AvatarController from "@/components/settingsScreen/AvatarController";
import { useClientDraftStore } from "@/store/useClientDraftStore";
import { X } from "lucide-react-native";
import { Alert, TouchableOpacity, useColorScheme, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import TextField from "../shared/TextField";

type Props = {
    type: string;
    onClose: () => void;
}

export default function CreateEditClient({ type, onClose }: Props) {
    const isDark = useColorScheme() === 'dark'
    const { reset } = useClientDraftStore()

    const handleClose = () => {
        Alert.alert(
            `Discard ${type === 'New' ? 'client' : 'changes'}`,
            `Are you sure you want to discard this ${type === 'New' ? 'new client' : 'changes'} ?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Discard",
                    style: "destructive",
                    onPress: () => {
                        reset()
                        onClose()
                    }
                }
            ]
        )
    }

    return (
        <KeyboardAwareScrollView className={`flex-1 ${isDark ? 'bg-black' : 'bg-[#f2f2f2]'}`} bottomOffset={40}>
            <View className="flex-1 p-8 gap-8">
                <View className="flex-row justify-center items-center">
                    <TouchableOpacity className="absolute left-0" onPress={handleClose}>
                        <X color={isDark ? 'white' : 'black'} />
                    </TouchableOpacity>

                    <TextField text={`${type} client`} className="font-semibold text-xl" />
                </View>

                <AvatarController />

                <ClientForm type={type} />
            </View>
        </KeyboardAwareScrollView>
    )
}