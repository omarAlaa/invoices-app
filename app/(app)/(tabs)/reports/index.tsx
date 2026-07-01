import InvoicesStatus from "@/components/reportstab/InvoicesStatus"
import ReportsHeader from "@/components/reportstab/ReportsHeader"
import RevenueChart from "@/components/reportstab/RevenueChart"
import StatsCard from "@/components/reportstab/StatsCards"
import TopClients from "@/components/reportstab/TopClients"
import { useState } from "react"
import { RefreshControl, ScrollView } from "react-native"

export default function Reports() {
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = () => {
        setRefreshing(true)

        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }

    return (
        <ScrollView
            contentContainerClassName="px-8 pb-6 gap-6"
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <ReportsHeader />

            <StatsCard />

            <RevenueChart />

            <InvoicesStatus />

            <TopClients />
        </ScrollView>
    )
}