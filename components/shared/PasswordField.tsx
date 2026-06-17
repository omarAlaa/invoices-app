import { Eye, EyeOff, Lock } from "lucide-react-native";
import { Ref, useState } from "react";
import { TextInput, useColorScheme, View } from "react-native";

type Props = {
    password: string,
    setPassword: (password: string) => void,
    passwordRef?: Ref<TextInput>,
    placeholder?: boolean
}

export default function PasswordField({ password, setPassword, passwordRef, placeholder }: Props) {
    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
    const [isFieldFocused, setIsFieldFocused] = useState(false)
    const systemColorScheme = useColorScheme()
    const iconsColor = isFieldFocused === true ? systemColorScheme === 'dark' ? 'white' : 'black' : 'gray'

    return (
        <View className={`flex-row items-center gap-4 border-2 bg-gray-200 rounded-xl p-4 dark:bg-zinc-800 ${isFieldFocused ? 'border-blue-600 dark:border-white' : 'border-gray-300 dark:border-zinc-700'}`}>
            <Lock color={iconsColor} />

            <TextInput
                className="flex-1 dark:color-white"
                value={password || ''}
                ref={passwordRef}
                onFocus={() => setIsFieldFocused(true)}
                onBlur={() => setIsFieldFocused(false)}
                onChangeText={setPassword}
                secureTextEntry={isPasswordSecure}
                placeholder={placeholder ? "Password" : undefined}
                placeholderTextColor={placeholder ? "#64748B" : undefined}
            />

            {isPasswordSecure ?
                <EyeOff
                    color={iconsColor}
                    onPress={() => setIsPasswordSecure(false)} />
                :
                <Eye color={iconsColor}
                    onPress={() => setIsPasswordSecure(true)} />}
        </View>
    )
}