import InvItem from "@/components/invoiceScreen/InvItem";
import InvoiceActions from "@/components/invoiceScreen/InvoiceActions";
import InvoiceInfo from "@/components/invoiceScreen/InvoiceInfo";
import OptionsMenu from "@/components/invoiceScreen/OptionsMenu";
import TotalAmount from "@/components/invoiceScreen/TotalAmount";
import Status from "@/components/shared/Status";
import TextField from "@/components/shared/TextField";
import { useInvoice, useInvoiceItems } from "@/features/invoices/api";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, RefreshControl, View } from "react-native";

export default function Invoice() {
    const { invoiceNumber, invoiceId } = useLocalSearchParams()
    const { data: invoice, isLoading, isError, error, refetch, isRefetching } = useInvoice(invoiceId.toString())
    const { data: items, isLoading: isItemsLoading, isError: isItemsError, refetch: itemsRefetch, isRefetching: isItemsRefetching } = useInvoiceItems(invoiceId.toString())

    return (
        <FlatList
            className="pt-4 pb-16 px-8"
            data={items}
            ListHeaderComponent={
                <View className="gap-4">
                    <Stack.Screen
                        options={{
                            title: `Invoice #${invoiceNumber}`,
                            headerBackButtonDisplayMode: 'minimal',
                            headerShadowVisible: false,
                            headerRight: () => <OptionsMenu invoice={invoice} items={items} screen="invoice" />
                        }}
                    />

                    <View className="justify-center items-center">
                        <Status status={invoice?.status} date={invoice?.due_date} isDetailed />
                    </View>

                    <InvoiceInfo invoice={invoice} />

                    <TextField text='Items' className="font-bold text-xl mb-3" />
                </View>
            }
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
                <InvItem item={item} />
            }
            ItemSeparatorComponent={() => <View className="my-4 border-b border-gray-400" />}
            refreshControl={
                <RefreshControl
                    refreshing={isRefetching}
                    onRefresh={refetch}
                />
            }
            ListFooterComponent={
                <View className="gap-4">
                    <View className="my-4 border-b border-gray-400" />

                    <TotalAmount
                        subtotal={invoice?.subtotal}
                        taxRate={invoice?.tax_rate}
                        taxAmount={invoice?.tax_amount}
                        total={invoice?.total} />

                    <InvoiceActions />
                </View>
            }
        />
    )
}