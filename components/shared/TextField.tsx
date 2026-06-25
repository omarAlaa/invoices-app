import { Text } from "react-native";

type Props = {
    text: string,
    type?: string
    className?: string
}

export default function TextField({ text, type, className }: Props) {
    return (
        <Text className={`${className} ${type === 'secondary' ? 'text-gray-500 dark:text-zinc-400' : type === 'highlighted' ? 'font-bold text-xl text-blue-600' : 'dark:text-white'}`}>{text}</Text>
    )
}