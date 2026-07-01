import InvoicesHeader from "@/components/invoicesScreen/InvoicesHeader";
import StatusFilters from "@/components/invoicesScreen/StatusFilters";
import FloatingAddButton from "@/components/shared/FloatingAddButton";
import InvoiceOverview from "@/components/shared/InvoiceOverview";
import ItemsList from "@/components/shared/ItemsList";
import { useScrollFAB } from "@/hooks/useScrollFAB";
import { Stack } from "expo-router";
import { useState } from "react";
import { RefreshControl, View } from "react-native";
import Animated from "react-native-reanimated";

export default function InvoicesScreen() {
    const { scrollHandler, buttonStyle, titleStyle, onHeaderLayout } = useScrollFAB()
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = () => {
        setRefreshing(true)

        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }

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

            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentContainerClassName="px-8 pb-16 gap-8"
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View onLayout={onHeaderLayout}>
                    <InvoicesHeader />
                </View>

                <StatusFilters />

                <ItemsList screen="invoice">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <InvoiceOverview key={index} />
                    ))}
                </ItemsList>
            </Animated.ScrollView>

            <FloatingAddButton animatedStyle={buttonStyle} screen='invoice' />
        </View>
    )
}