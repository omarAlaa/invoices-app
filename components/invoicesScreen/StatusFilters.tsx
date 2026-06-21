import { useState } from "react";
import { FlatList, View } from "react-native";
import StatusChip from "./StatusChip";

const CHIPS_DATA = ['All', 'Paid', 'Pending', 'Overdue']

export default function StatusFilters() {
    const [filterSelected, setFilterSelected] = useState('All')

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
                        onPress={() => setFilterSelected(item)}
                        filterSelected={filterSelected} />}
            />
        </View>
    )
}