import SettingsButton from "@/components/settingsScreen/SettingsButton";
import PasswordField from "@/components/shared/PasswordField";
import { supabase } from "@/lib/supabase";
import { useRef, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function ChangePasswordScreen() {
    const [newPassword, setNewPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const passwordRef = useRef<TextInput>(null)
    const bttnDisabled = loading || !newPassword

    const changePassword = async () => {
        try {
            setLoading(true)

            let { error } = await supabase.auth.updateUser({ password: newPassword })

            if (error) {
                throw error
            }

            Alert.alert('Password changed')
            setNewPassword('')
            passwordRef.current?.blur();
        } catch (error: any) {
            Alert.alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <View className="p-8 gap-6">
                <View className="gap-2">
                    <Text className="dark:text-white">New password</Text>

                    <PasswordField
                        password={newPassword}
                        setPassword={setNewPassword}
                        passwordRef={passwordRef} />
                </View>

                <SettingsButton
                    label="Change"
                    loading={loading}
                    bttnDisabled={bttnDisabled}
                    onPress={changePassword} />
            </View>
        </KeyboardAwareScrollView>
    )
}