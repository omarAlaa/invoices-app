import InvoicesStatus from "@/components/reportstab/InvoicesStatus"
import ReportsHeader from "@/components/reportstab/ReportsHeader"
import RevenueChart from "@/components/reportstab/RevenueChart"
import StatsCard from "@/components/reportstab/StatsCards"
import TopClients from "@/components/reportstab/TopClients"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Reports() {
    return (
        <SafeAreaView className="flex-1 px-8 pt-8 gap-6">
            <ReportsHeader />

            <StatsCard />

            <RevenueChart />

            <InvoicesStatus />

            <TopClients />
        </SafeAreaView>
    )
}