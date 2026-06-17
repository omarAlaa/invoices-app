import { Mail } from "lucide-react-native";
import { useState } from "react";
import { TextInput, useColorScheme, View } from "react-native";

type Props = {
    value?: string,
    setValue?: (value: string) => void,
    isEmail?: boolean,
    notEditable?: boolean
}

export default function InputField({ value, setValue, isEmail, notEditable }: Props) {
    const [isFieldFocused, setIsFieldFocused] = useState(false)
    const systemColorScheme = useColorScheme()
    const iconsColor = isFieldFocused === true ? systemColorScheme === 'dark' ? 'white' : 'black' : 'gray'

    return (
        <View className={`flex-row items-center gap-4 border-2 bg-gray-200 rounded-xl p-4 dark:bg-zinc-800 ${isFieldFocused ? 'border-blue-600 dark:border-white' : 'border-gray-300 dark:border-zinc-700'} ${notEditable ? 'opacity-50' : ''}`}>
            {isEmail && <Mail color={iconsColor} />}

            <TextInput
                className="flex-1 dark:color-white"
                editable={!notEditable}
                value={value}
                placeholder={isEmail ? "Email Address" : undefined}
                autoCorrect={!isEmail}
                placeholderTextColor={isEmail ? "#64748B" : undefined}
                keyboardType={isEmail ? "email-address" : 'default'}
                autoCapitalize={isEmail ? "none" : undefined}
                onChangeText={setValue}
                onFocus={() => setIsFieldFocused(true)}
                onBlur={() => setIsFieldFocused(false)} />
        </View>
    )
}