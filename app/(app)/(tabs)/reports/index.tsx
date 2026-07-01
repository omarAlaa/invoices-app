import InvoicesStatus from "@/components/reportstab/InvoicesStatus"
import ReportsHeader from "@/components/reportstab/ReportsHeader"
import RevenueChart from "@/components/reportstab/RevenueChart"
import StatsCard from "@/components/reportstab/StatsCards"
import TopClients from "@/components/reportstab/TopClients"
import { useScrollFAB } from "@/hooks/useScrollFAB"
import { Stack } from "expo-router"
import { useState } from "react"
import { RefreshControl, ScrollView, View } from "react-native"
import Animated from "react-native-reanimated"

export default function Reports() {
    const [refreshing, setRefreshing] = useState(false)
    const { onScrollNoFAB, titleStyle, onHeaderLayout } = useScrollFAB()

    const onRefresh = () => {
        setRefreshing(true)

        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }

    return (
        <ScrollView
            contentContainerClassName="px-8 pb-6 gap-6"
            onScroll={onScrollNoFAB}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
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

            <StatsCard />

            <RevenueChart />

            <InvoicesStatus />

            <TopClients />
        </ScrollView>
    )
}