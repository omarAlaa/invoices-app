import AvatarController from "@/components/settingsScreen/AvatarController";
import UpdateForm from "@/components/settingsScreen/UpdateForm";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function Profile() {
    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" bottomOffset={40}>
            <View className="p-8 gap-16">
                <AvatarController />

                <UpdateForm />
            </View>
        </KeyboardAwareScrollView>
    )
}