import ClientOverview from "@/components/clientsTab/ClientOverview"
import ClientsHeader from "@/components/clientsTab/ClientsHeader"
import FloatingAddButton from "@/components/shared/FloatingAddButton"
import OverviewSkeleton from "@/components/shared/OverviewSkeleton"
import SkeletonBlock from "@/components/shared/SkeletonBlock"
import TextField from "@/components/shared/TextField"
import { useClientsWithStats } from "@/features/clients/api"
import { useDashboardSummary } from "@/features/stats/api"
import { useScrollFAB } from "@/hooks/useScrollFAB"
import { ClientsSection, ClientStats } from "@/lib/definitons"
import { formatCurrency, groupByLetter } from "@/lib/utils"
import { Stack } from "expo-router"
import { useCallback, useMemo } from "react"
import { RefreshControl, SectionList, SectionListRenderItemInfo, View } from "react-native"
import Animated from "react-native-reanimated"

export default function Clients() {
    const { data: clients, isLoading, isError, refetch, isRefetching } = useClientsWithStats()
    const { data: dashboardSummary } = useDashboardSummary()
    const { onScroll, buttonStyle, titleStyle, onHeaderLayout } = useScrollFAB()
    const sections = useMemo(() => groupByLetter(clients), [clients])

    const renderItem = useCallback(
        ({ item }: SectionListRenderItemInfo<ClientStats>) => <ClientOverview clientStats={item} />,
        [],
    );

    const renderSectionHeader = useCallback(
        ({ section }: { section: ClientsSection }) => <TextField text={section.title} type="secondary" />,
        [],
    );

    return (
        <View className="flex-1 px-8">
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <Animated.Text
                            style={titleStyle}
                            className="font-semibold text-xl dark:text-white"
                        >
                            Clients
                        </Animated.Text>
                    ),
                }}
            />

            <SectionList<ClientStats, ClientsSection>
                ListHeaderComponent={
                    <View className="mb-4">
                        <View onLayout={onHeaderLayout}>
                            <ClientsHeader />
                        </View>

                        {isLoading ? <SkeletonBlock className="w-72 h-5 mt-2" /> : <TextField text={`${clients?.length} clients · ${formatCurrency(dashboardSummary?.totalOutstanding)} billed all-time`} type="secondary" className="text-lg" />}

                        {isLoading && <View className="mt-4 gap-8">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <OverviewSkeleton key={index} />
                            ))}
                        </View>}
                    </View>
                }
                onScroll={onScroll}
                scrollEventThrottle={16}
                sections={sections}
                keyExtractor={(item) => item.client_id}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                stickySectionHeadersEnabled
                // ListEmptyComponent={
                //     <View className="items-center mt-24">
                //         <User size={40} color="#d4d4d4" />
                //         <TextField text="No clients yet" />
                //     </View>
                // }
                contentContainerStyle={{ paddingBottom: 100, flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={refetch}
                    />
                }
            />

            <FloatingAddButton animatedStyle={buttonStyle} screen="client" />
        </View>
    )
}