import Header from "@/components/shared/Header"
import { Search } from "lucide-react-native"
import { TouchableOpacity, useColorScheme } from "react-native"

export default function ClientsHeader() {
    const systemColorScheme = useColorScheme()

    return (
        <Header title="Clients">
            <TouchableOpacity>
                <Search color={systemColorScheme === 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>
        </Header>
    )
}