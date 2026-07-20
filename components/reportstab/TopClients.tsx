import { formatCurrency } from "@/lib/utils";
import { Link } from "expo-router";
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
        topClients &&
        <View className="gap-1">
            <TextField text="Top clients" className="font-bold text-lg" />

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
        </View>
    )
}