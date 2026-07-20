import { useRecentInvoices } from "@/features/invoices/api";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import InvoiceOverview from "../shared/InvoiceOverview";
import OverviewSkeleton from "../shared/OverviewSkeleton";
import TextField from "../shared/TextField";

export default function RecentInvoices() {
    const { data: recentInvoices, isLoading, isError, refetch, isRefetching } = useRecentInvoices()

    return (
        <View className="flex-1 gap-5 mb-[-4rem]">
            <View className="flex-row justify-between">
                <TextField text="Recent invoices" className="font-bold text-xl" />

                <Link href='/invoices' asChild>
                    <TouchableOpacity>
                        <TextField text="See all" type="highlighted" />
                    </TouchableOpacity>
                </Link>
            </View>

            <View className="gap-5">
                {isLoading ?
                    Array.from({ length: 4 }).map((_, index) => (
                        <OverviewSkeleton key={index} isInvoice />
                    ))
                    :
                    recentInvoices?.map(invoice =>
                        <InvoiceOverview key={invoice.id} invoiceListRow={invoice} />
                    )}
            </View>
        </View>
    )
}