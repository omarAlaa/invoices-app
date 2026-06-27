import InvoicesHeader from "@/components/invoicesScreen/InvoicesHeader";
import StatusFilters from "@/components/invoicesScreen/StatusFilters";
import InvoiceOverview from "@/components/shared/InvoiceOverview";
import ItemsList from "@/components/shared/ItemsList";
import { View } from "react-native";

export default function InvoicesScreen() {
    return (
        <View className="flex-1 px-8 pb-16 gap-8">
            <InvoicesHeader />

            <StatusFilters />

            <ItemsList screen="invoice">
                {Array.from({ length: 20 }).map((_, index) => (
                    <InvoiceOverview key={index} />
                ))}
            </ItemsList>
        </View>
    );
}