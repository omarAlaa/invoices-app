import { ClientStats } from "@/lib/definitons";
import { formatCurrency } from "@/lib/utils";
import { Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import Avatar from "../settingsScreen/Avatar";
import TextField from "../shared/TextField";

export default function ClientOverview({ clientStats }: { clientStats: ClientStats }) {
    return (
        <Link href={{
            pathname: '/client/[clientId]',
            params: { clientId: clientStats.client_id, fullName: `${clientStats.first_name} ${clientStats.last_name}` }
        }} asChild>
            <TouchableOpacity className="flex-row justify-between items-center py-4 mt-1 border-t border-gray-300">
                <View className="flex-row gap-2 items-center">
                    <Avatar
                        size='xs'
                        firstName={clientStats.first_name}
                        lastName={clientStats.last_name}
                        url={clientStats.image_url}
                        isInvAvatar
                    />

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