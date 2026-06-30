import { Mail, Search } from "lucide-react-native";
import { useState } from "react";
import { InputModeOptions, TextInput, useColorScheme, View } from "react-native";

type Props = {
    value?: string | number,
    setValue?: (value: string) => void,
    isEmail?: boolean,
    type?: InputModeOptions,
    notEditable?: boolean,
    placeholder?: string,
    isSearch?: boolean,
    isNumeric?: boolean,
    isCurrency?: boolean,
}

export default function InputField({ value, setValue, isEmail, type, notEditable, placeholder, isSearch, isNumeric, isCurrency }: Props) {
    const [isFieldFocused, setIsFieldFocused] = useState(false)
    const systemColorScheme = useColorScheme()
    const iconsColor = isFieldFocused === true ? systemColorScheme === 'dark' ? 'white' : 'black' : 'gray'

    const handleChangeText = (text: string) => {
        if (!setValue) return

        if (isNumeric || isCurrency) {
            const sanitized = text
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*)\./g, '$1')

            setValue(sanitized)
            return
        }

        setValue(text)
    }

    return (
        <View className={`flex-row items-center border-2 px-4 gap-4 bg-white rounded-xl dark:bg-zinc-900 ${isFieldFocused ? 'border-blue-600 dark:border-white' : 'border-white dark:border-zinc-900'} ${notEditable ? 'opacity-50' : ''}`}>
            {isEmail && <Mail color={iconsColor} />}

            {isSearch && <Search color={iconsColor} />}

            <TextInput
                className="flex-1 dark:color-white py-4"
                editable={!notEditable}
                value={value !== undefined ? String(value) : undefined}
                placeholder={isEmail ? "Email Address" : placeholder}
                autoCorrect={!isEmail && !isNumeric && !isCurrency}
                placeholderTextColor={isEmail || isSearch || isNumeric || isCurrency ? "gray" : undefined}
                keyboardType={isEmail ? "email-address" : (isNumeric || isCurrency) ? "decimal-pad" : 'default'}
                autoCapitalize={isEmail ? "none" : undefined}
                inputMode={(isNumeric || isCurrency) ? "decimal" : type}
                onChangeText={handleChangeText}
                onFocus={() => setIsFieldFocused(true)}
                onBlur={() => setIsFieldFocused(false)} />
        </View>
    )
}