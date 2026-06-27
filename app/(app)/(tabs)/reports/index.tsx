import InvoicesStatus from "@/components/reportstab/InvoicesStatus"
import ReportsHeader from "@/components/reportstab/ReportsHeader"
import RevenueChart from "@/components/reportstab/RevenueChart"
import StatsCard from "@/components/reportstab/StatsCards"
import TopClients from "@/components/reportstab/TopClients"
import { View } from "react-native"

export default function Reports() {
    return (
        <View className="flex-1 px-8 pb-16 gap-6">
            <ReportsHeader />

            <StatsCard />

            <RevenueChart />

            <InvoicesStatus />

            <TopClients />
        </View>
    )
}