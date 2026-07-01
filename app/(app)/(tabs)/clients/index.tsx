import ClientsList from "@/components/clientsTab/ClientsList"
import { View } from "react-native"

export default function Clients() {

    return (
        <View className="flex-1">
            <ClientsList />
        </View>
    )
}