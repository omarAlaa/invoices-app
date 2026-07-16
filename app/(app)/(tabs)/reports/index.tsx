import InvoicesStatus from "@/components/reportstab/InvoicesStatus"
import ReportsHeader from "@/components/reportstab/ReportsHeader"
import RevenueChart from "@/components/reportstab/RevenueChart"
import StatsCard from "@/components/reportstab/StatsCards"
import TopClients from "@/components/reportstab/TopClients"
import { useReportsSummary } from "@/features/reports/api"
import { useScrollFAB } from "@/hooks/useScrollFAB"
import { Stack } from "expo-router"
import { useState } from "react"
import { RefreshControl, ScrollView, View } from "react-native"
import Animated from "react-native-reanimated"

export default function Reports() {
    const { data: summary, isLoading, isError, refetch, isRefetching } = useReportsSummary(('this_month'))
    const [refreshing, setRefreshing] = useState(false)
    const { onScrollNoFAB, titleStyle, onHeaderLayout } = useScrollFAB()

    return (
        <ScrollView
            contentContainerClassName="px-8 pb-6 gap-6"
            onScroll={onScrollNoFAB}
            refreshControl={
                <RefreshControl
                    refreshing={isRefetching}
                    onRefresh={refetch}
                />
            }
        >
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <Animated.Text
                            style={titleStyle}
                            className="font-semibold text-xl dark:text-white"
                        >
                            Reports
                        </Animated.Text>
                    ),
                }}
            />

            <View onLayout={onHeaderLayout}>
                <ReportsHeader />
            </View>

            <StatsCard
                revenue={summary?.revenue}
                oustanding={summary?.outstanding}
                invoicesSent={summary?.invoicesSent}
                avgValue={summary?.averageValue}
            />

            <RevenueChart />

            <InvoicesStatus statusBreakdown={summary?.statusBreakdown} invsCount={summary?.invoicesSent} />

            <TopClients topClients={summary?.topClients} />
        </ScrollView>
    )
}