import { Eye, EyeOff, Lock } from "lucide-react-native";
import { Ref, useState } from "react";
import { TextInput, View } from "react-native";

type Props = {
    password: string,
    setPassword: (password: string) => void,
    passwordRef?: Ref<TextInput>,
    placeholder?: boolean
}

export default function PasswordField({ password, setPassword, passwordRef, placeholder }: Props) {
    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
    const [isFieldFocused, setIsFieldFocused] = useState(false)

    return (
        <View className={`flex-row items-center gap-4 border-2 bg-gray-200 rounded-xl p-4 ${isFieldFocused === true ? 'border-blue-600' : 'border-gray-300'}`}>
            <Lock color={isFieldFocused === true ? 'black' : 'gray'} />

            <TextInput
                value={password || ''}
                ref={passwordRef}
                onFocus={() => setIsFieldFocused(true)}
                onBlur={() => setIsFieldFocused(false)}
                onChangeText={setPassword}
                className='flex-1'
                secureTextEntry={isPasswordSecure}
                placeholder={placeholder ? "Password" : undefined}
                placeholderTextColor={placeholder ? "#64748B" : undefined}
            />

            {isPasswordSecure ?
                <EyeOff
                    color={isFieldFocused === true ? 'black' : 'gray'}
                    onPress={() => setIsPasswordSecure(false)} />
                :
                <Eye color={isFieldFocused === true ? 'black' : 'gray'}
                    onPress={() => setIsPasswordSecure(true)} />}
        </View>
    )
}