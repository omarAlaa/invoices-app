import { Mail } from "lucide-react-native";
import { useState } from "react";
import { TextInput, View } from "react-native";

type Props = {
    value?: string,
    setValue?: (value: string) => void,
    isEmail?: boolean,
    notEditable?: boolean
}

export default function InputField({ value, setValue, isEmail, notEditable }: Props) {
    const [isFieldFocused, setIsFieldFocused] = useState(false)

    return (
        <View className={`flex-row items-center gap-4 border-2 bg-gray-200 rounded-xl p-4 ${isFieldFocused ? 'border-blue-600' : 'border-gray-300'} ${notEditable ? 'opacity-50' : ''}`}>
            {isEmail && <Mail color={isFieldFocused ? 'black' : 'gray'} />}

            <TextInput
                className="flex-1"
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