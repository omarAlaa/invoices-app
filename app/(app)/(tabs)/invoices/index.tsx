import InvoicesHeader from "@/components/invoicesScreen/InvoicesHeader";
import StatusFilters from "@/components/invoicesScreen/StatusFilters";
import InvoiceOverview from "@/components/shared/InvoiceOverview";
import ItemsList from "@/components/shared/ItemsList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InvoicesScreen() {
    return (
        <SafeAreaView className="flex-1 px-8 pt-8 gap-8">
            <InvoicesHeader />

            <StatusFilters />

            <ItemsList screen="invoice">
                {Array.from({ length: 20 }).map((_, index) => (
                    <InvoiceOverview key={index} />
                ))}
            </ItemsList>
        </SafeAreaView>
    );
}