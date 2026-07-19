import InvoicesHeader from "@/components/invoicesScreen/InvoicesHeader";
import StatusFilters from "@/components/invoicesScreen/StatusFilters";
import FloatingAddButton from "@/components/shared/FloatingAddButton";
import InvoiceOverview from "@/components/shared/InvoiceOverview";
import InvoiceOverviewSkeleton from "@/components/shared/InvoiceOverviewSkeleton";
import { useInvoices } from "@/features/invoices/api";
import { useScrollFAB } from "@/hooks/useScrollFAB";
import { InvoiceFilter } from "@/lib/definitons";
import { Stack } from "expo-router";
import { useState } from "react";
import { RefreshControl, View } from "react-native";
import Animated from "react-native-reanimated";

export default function InvoicesScreen() {
    const [filter, setFilter] = useState<InvoiceFilter>('all')
    const { data: invoices, isLoading, isError, refetch, isRefetching } = useInvoices(filter)
    const { scrollHandler, buttonStyle, titleStyle, onHeaderLayout } = useScrollFAB()

    return (
        <View className="flex-1">
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <Animated.Text
                            style={titleStyle}
                            className="font-semibold text-xl dark:text-white"
                        >
                            Invoices
                        </Animated.Text>
                    ),
                }}
            />

            <Animated.FlatList
                data={invoices}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentContainerClassName="flex-1 px-8 pb-16 gap-8"
                ListHeaderComponent={
                    <View className="gap-8">
                        <View onLayout={onHeaderLayout}>
                            <InvoicesHeader />
                        </View>

                        <StatusFilters filter={filter} setFilter={setFilter} />

                        {isLoading && <View className="gap-8">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <InvoiceOverviewSkeleton key={index} />
                            ))}
                        </View>}
                    </View>
                }
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <InvoiceOverview invoiceListRow={item} />}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={refetch}
                    />
                }
            />
            <FloatingAddButton animatedStyle={buttonStyle} screen='invoice' />
        </View>
    )
}