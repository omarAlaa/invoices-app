import InvoicesHeader from "@/components/invoicesScreen/InvoicesHeader";
import StatusFilters from "@/components/invoicesScreen/StatusFilters";
import ItemsList from "@/components/shared/ItemsList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InvoicesScreen() {
    return (
        <SafeAreaView className="flex-1 px-8 pt-8 gap-8">
            <InvoicesHeader />

            <StatusFilters />

            <ItemsList />
        </SafeAreaView>
    );
}