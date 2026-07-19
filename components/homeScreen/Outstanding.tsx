import { useDashboardSummary } from "@/features/stats/api";
import { formatCurrency } from "@/lib/utils";
import { View } from "react-native";
import Card from "../shared/Card";
import TextField from "../shared/TextField";
import OutstandingSkeleton from "./OutstandingSkeleton";
import StatusMoney from "./StatusMoney";

export default function Outstanding() {
    const { data: dashboardSummary, isLoading, isError, refetch, isRefetching } = useDashboardSummary()

    if (isLoading) {
        return <OutstandingSkeleton />
    }

    return (
        <Card>
            <TextField text="Total outstanding" type="secondary" className="text-xl" />

            <TextField text={formatCurrency(dashboardSummary?.totalOutstanding)} className="text-4xl font-bold mt-2" />

            <View className="my-8 border-b border-gray-400" />

            <View className="flex-row justify-between">
                <StatusMoney status="Paid" amount={dashboardSummary?.totalPaid} />

                <StatusMoney status="Pending" amount={dashboardSummary?.totalPending} />

                <StatusMoney status="Overdue" amount={dashboardSummary?.totalOverdue} />
            </View>
        </Card>
    )
}