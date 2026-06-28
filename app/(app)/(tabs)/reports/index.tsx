import InvoicesStatus from "@/components/reportstab/InvoicesStatus"
import ReportsHeader from "@/components/reportstab/ReportsHeader"
import RevenueChart from "@/components/reportstab/RevenueChart"
import StatsCard from "@/components/reportstab/StatsCards"
import TopClients from "@/components/reportstab/TopClients"
import { ScrollView } from "react-native"

export default function Reports() {
    return (
        <ScrollView contentContainerClassName="px-8 pb-6 gap-6">
            <ReportsHeader />

            <StatsCard />

            <RevenueChart />

            <InvoicesStatus />

            <TopClients />
        </ScrollView>
    )
}