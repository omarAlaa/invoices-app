import ActionButton from "@/components/shared/ActionButton";
import PasswordField from "@/components/shared/PasswordField";
import { supabase } from "@/lib/supabase";
import { useRef, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView, KeyboardProvider } from "react-native-keyboard-controller";

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
        <KeyboardProvider>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                <View className="p-8 gap-6">
                    <View className="gap-2">
                        <Text>New password</Text>

                        <PasswordField
                            password={newPassword}
                            setPassword={setNewPassword}
                            passwordRef={passwordRef} />
                    </View>

                    <ActionButton
                        label="Change"
                        loading={loading}
                        bttnDisabled={bttnDisabled}
                        onPress={changePassword} />
                </View>
            </KeyboardAwareScrollView>
        </KeyboardProvider>
    )
}