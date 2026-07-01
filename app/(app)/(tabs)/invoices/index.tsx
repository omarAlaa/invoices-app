import InvoicesHeader from "@/components/invoicesScreen/InvoicesHeader";
import StatusFilters from "@/components/invoicesScreen/StatusFilters";
import FloatingAddButton from "@/components/shared/FloatingAddButton";
import InvoiceOverview from "@/components/shared/InvoiceOverview";
import ItemsList from "@/components/shared/ItemsList";
import { useScrollFAB } from "@/hooks/useScrollFAB";
import { useState } from "react";
import { RefreshControl, View } from "react-native";
import Animated from "react-native-reanimated";

export default function InvoicesScreen() {
    const { scrollHandler, buttonStyle } = useScrollFAB()
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = () => {
        setRefreshing(true)

        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }

    return (
        <View>
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
                <InvoicesHeader />

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