import { useClientStats } from "@/features/clients/api";
import { formatCurrency } from "@/lib/utils";
import { Text, View } from "react-native";
import Card from "../shared/Card";
import TextField from "../shared/TextField";

type Props = {
    clientId: string | string[];
}

export default function ClientStatusCards({ clientId }: Props) {
    const { data: clientStats, isLoading, isError, refetch, isRefetching } = useClientStats(clientId.toString())


    return (
        <View className="flex-row justify-between gap-4">
            <Card>
                <TextField text="Invoiced" className="text-lg" type="secondary" />

                <TextField text={formatCurrency(clientStats?.total_invoiced)} className="font-bold text-lg" />
            </Card>

            <Card>
                <TextField text="Paid" className="text-lg" type="secondary" />

                <Text className="font-bold text-lg text-green-800 dark:text-green-800">{formatCurrency(clientStats?.total_paid)}</Text>
            </Card>

            <Card>
                <TextField text="Owed" className="text-lg" type="secondary" />

                <Text className="font-bold text-lg text-red-800 dark:text-red-800">{formatCurrency(clientStats?.total_owed)}</Text>
            </Card>
        </View>
    )
}