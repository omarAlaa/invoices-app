import { formatCurrency } from "@/lib/utils";
import { Link } from "expo-router";
import { User } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import TextField from "../shared/TextField";

type Props = {
    topClients: {
        clientId: string;
        name: string;
        total: number;
    }[] | undefined;
}

export default function TopClients({ topClients }: Props) {
    return (
        <View className="gap-1">
            <TextField text="Top clients" className="font-bold text-lg" />

            {topClients?.length ?
                <View className="gap-2">
                    {topClients.map((client, index) =>
                        <View key={client.clientId}>
                            <Link
                                href={{
                                    pathname: '/client/[clientId]',
                                    params: { clientId: client.clientId, fullName: client.name }
                                }}
                                asChild>
                                <TouchableOpacity className="flex-row justify-between items-center py-2">
                                    <TextField text={`${index + 1}. ${client.name}`} className="text-lg" />

                                    <TextField text={formatCurrency(client.total)} className="font-bold" />
                                </TouchableOpacity>
                            </Link>

                            {index !== topClients.length - 1 && <View className="border-b border-gray-400" />}
                        </View>
                    )}
                </View>
                :
                <View className="items-center mt-4">
                    <User size={40} color="#d4d4d4" />
                    <TextField text="No clients yet" />
                </View>
            }
        </View>
    )
}