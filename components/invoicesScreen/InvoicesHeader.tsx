import { Funnel, Search } from "lucide-react-native";
import { TouchableOpacity, useColorScheme } from "react-native";
import Header from "../shared/Header";

export default function InvoicesHeader() {
    const systemColorScheme = useColorScheme()

    return (
        <Header title="Invoices">
            <TouchableOpacity>
                <Search color={systemColorScheme === 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>

            <TouchableOpacity>
                <Funnel color={systemColorScheme === 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>
        </Header>
    )
}