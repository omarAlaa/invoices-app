import ClientsHeader from "@/components/clientsTab/ClientsHeader"
import TextField from "@/components/shared/TextField"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Clients() {
    return (
        <SafeAreaView className="flex-1 px-8 pt-8 gap-4">
            <ClientsHeader />

            <TextField text="24 clients · $42,180 billed all-time" type="secondary" className="text-lg" />

            <Link href="/client/Nova Midea">s</Link>

            <Link href="/createEditClient">l</Link>
        </SafeAreaView>
    )
}