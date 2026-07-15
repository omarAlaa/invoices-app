import ClientInfo from "@/components/clientScreen/ClientInfo";
import ClientStatusCards from "@/components/clientScreen/ClientStatusCards";
import OptionsMenu from "@/components/invoiceScreen/OptionsMenu";
import FloatingAddButton from "@/components/shared/FloatingAddButton";
import InvoiceOverview from "@/components/shared/InvoiceOverview";
import TextField from "@/components/shared/TextField";
import { useClient } from "@/features/clients/api";
import { useClientInvoices } from "@/features/invoices/api";
import { useScrollFAB } from "@/hooks/useScrollFAB";
import { Stack, useLocalSearchParams } from "expo-router";
import { RefreshControl, View } from "react-native";
import Animated from "react-native-reanimated";

export default function ClientScreen() {
    const { clientId, fullName } = useLocalSearchParams()
    const { scrollHandler, buttonStyle } = useScrollFAB()
    const { data: clientInfo, isLoading, isError, refetch, isRefetching } = useClient(clientId.toString())
    const { data: clientInvoices, isLoading: isInvoicesLoading, isError: isInvoicesError, refetch: refetchInvoices, isRefetching: isInvoicesRefetching } = useClientInvoices(clientId.toString())

    return (
        <View className="flex-1 px-8">
            <Stack.Screen
                options={{
                    title: `${fullName}`,
                    headerBackButtonDisplayMode: 'minimal',
                    headerShadowVisible: false,
                    headerRight: () => <OptionsMenu client={clientInfo} screen="client" />
                }}
            />

            <Animated.FlatList
                data={clientInvoices}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentContainerClassName="flex-1 gap-4 pt-4 pb-16"
                ListHeaderComponent={
                    <View className="gap-4">
                        <ClientInfo client={clientInfo} />

                        <ClientStatusCards clientId={clientId} />

                        <TextField text="Invoices" className="font-bold text-lg" />
                    </View>
                }
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <InvoiceOverview invoiceListRow={item} />}
                refreshControl={
                    <RefreshControl
                        refreshing={isInvoicesRefetching}
                        onRefresh={refetchInvoices}
                    />
                }
            />

            <FloatingAddButton animatedStyle={buttonStyle} screen="clientInvoices" />
        </View>
    )
}