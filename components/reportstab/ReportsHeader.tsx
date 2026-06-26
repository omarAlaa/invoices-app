import Header from "@/components/shared/Header"
import { ChevronDown } from "lucide-react-native"
import { TouchableOpacity, useColorScheme } from "react-native"
import TextField from "../shared/TextField"

export default function ReportsHeader() {
    const systemColorScheme = useColorScheme()

    return (
        <Header title="Reports">
            <TouchableOpacity className="flex-row items-center gap-2 rounded-full bg-white dark:bg-zinc-800 px-4 py-2">
                <TextField text="This month" className="font-bold" />

                <ChevronDown color={systemColorScheme === 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>
        </Header>
    )
}