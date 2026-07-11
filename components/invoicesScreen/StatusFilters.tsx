import { InvoiceFilter, InvoiceStatus } from "@/lib/definitons";
import { FlatList, View } from "react-native";
import StatusChip from "./StatusChip";

type Props = {
    filter: InvoiceFilter;
    setFilter: (filter: InvoiceFilter) => void;
}


const CHIPS_DATA: InvoiceStatus[] = ['all', 'paid', 'pending', 'overdue']

export default function StatusFilters({ setFilter, filter }: Props) {
    return (
        <View>
            <FlatList
                data={CHIPS_DATA}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
                contentContainerClassName="gap-2"
                renderItem={({ item }) =>
                    <StatusChip
                        label={item}
                        onPress={() => setFilter(item)}
                        filterSelected={filter} />}
            />
        </View>
    )
}