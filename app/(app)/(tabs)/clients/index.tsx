import ClientsHeader from "@/components/clientsTab/ClientsHeader"
import ClientsList from "@/components/clientsTab/ClientsList"
import TextField from "@/components/shared/TextField"
import { View } from "react-native"

export default function Clients() {

    return (
        <View className="flex-1 px-8 pb-16 gap-4">
            <ClientsHeader />

            <TextField text="24 clients · $42,180 billed all-time" type="secondary" className="text-lg" />

            <ClientsList />
        </View>
    )
}