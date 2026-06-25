import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
    isSecondary?: boolean;
    children: React.ReactNode;
}

export default function ActionButton({ children, ...props }: Props) {
    return (
        <TouchableOpacity
            {...props}
            className={`flex-1 flex-row p-3 gap-2 justify-center items-center rounded-full ${props.isSecondary ? 'bg-white border-2 border-gray-200 dark:bg-zinc-800 dark:border-0' : 'bg-blue-200 dark:bg-blue-950'}`}>
            {children}
        </TouchableOpacity>
    )
}