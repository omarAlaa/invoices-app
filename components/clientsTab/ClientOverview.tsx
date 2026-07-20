import { ClientStats } from "@/lib/definitons";
import { formatCurrency } from "@/lib/utils";
import { Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import TextField from "../shared/TextField";

export default function ClientOverview({ clientStats }: { clientStats: ClientStats }) {
    return (
        <Link href={{
            pathname: '/client/[clientId]',
            params: { clientId: clientStats.client_id, fullName: `${clientStats.first_name} ${clientStats.last_name}` }
        }} asChild>
            <TouchableOpacity className="flex-row justify-between items-center py-4 mt-1 border-t border-gray-300">
                <View className="flex-row gap-2 items-center">
                    <View className="w-12 h-12 rounded-full bg-blue-200 justify-center items-center">
                        <Text className="font-bold text-xl text-blue-600">{`${clientStats.first_name[0]}${clientStats.last_name && clientStats.last_name[0]}`}</Text>
                    </View>

                    <View>
                        <TextField text={`${clientStats.first_name} ${clientStats.last_name}`} className="font-bold text-lg" />

                        <TextField
                            text={`${clientStats.invoice_count} invoices. ${formatCurrency(clientStats.total_invoiced)} billed`}
                            type="secondary" />
                    </View>
                </View>

                <ChevronRight color="#d4d4d4" />
            </TouchableOpacity>
        </Link>
    )
}