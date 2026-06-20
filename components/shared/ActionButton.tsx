import { TouchableOpacity } from "react-native"

interface Props extends React.PropsWithChildren {
    isSecondary?: boolean,
}

export default function ActionButton({ isSecondary, children }: Props) {
    return (
        <TouchableOpacity className={`flex-1 flex-row p-3 gap-2 justify-center items-center rounded-full ${isSecondary ? 'bg-white border-2 border-gray-200 dark:bg-zinc-800 dark:border-0' : 'bg-blue-200 dark:bg-blue-950'}`}>
            {children}
        </TouchableOpacity>
    )
}