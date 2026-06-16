import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, Lock } from "lucide-react-native";
import { useRef, useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView, KeyboardProvider } from "react-native-keyboard-controller";

export default function ChangePasswordScreen() {
    const [newPassword, setNewPassword] = useState('')
    const [isFieldFocused, setIsFieldFocused] = useState(false)
    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
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
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" scrollEnabled={false}>
                <View className="p-8 gap-2">
                    <Text>New password</Text>

                    <View className={`flex-row items-center gap-4 border-2 bg-gray-200 rounded-xl px-4 ${isFieldFocused === true ? 'border-blue-600' : 'border-gray-300'}`}>
                        <Lock color={isFieldFocused === true ? 'black' : 'gray'} />

                        <TextInput
                            value={newPassword || ''}
                            ref={passwordRef}
                            onFocus={() => setIsFieldFocused(true)}
                            onBlur={() => setIsFieldFocused(false)}
                            onChangeText={setNewPassword}
                            className='flex-1 py-4'
                            secureTextEntry={isPasswordSecure}
                        />

                        {isPasswordSecure ? <EyeOff color={isFieldFocused === true ? 'black' : 'gray'} onPress={() => setIsPasswordSecure(false)} /> : <Eye color={isFieldFocused === true ? 'black' : 'gray'} onPress={() => setIsPasswordSecure(true)} />}
                    </View>

                    <TouchableOpacity
                        className={`mt-4 flex-row gap-2 justify-center items-center bg-sky-800 rounded-full p-4 ${bttnDisabled && !loading ? 'opacity-40' : ''}`}
                        disabled={bttnDisabled}
                        onPress={changePassword}>
                        <Text className='color-white font-bold text-xl'>Update</Text>

                        {loading && <ActivityIndicator color={'white'} />}
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </KeyboardProvider>
    )
}