import { useState } from "react";
import { View } from "react-native";
import StatusChip from "./StatusChip";

export default function StatusFilters() {
    const [filterSelected, setFilterSelected] = useState('All')

    return (
        <View className="flex-row gap-2">
            <StatusChip label="All" onPress={() => setFilterSelected('All')} filterSelected={filterSelected} />

            <StatusChip label="Paid" onPress={() => setFilterSelected('Paid')} filterSelected={filterSelected} />

            <StatusChip label="Pending" onPress={() => setFilterSelected('Pending')} filterSelected={filterSelected} />

            <StatusChip label="Overdue" onPress={() => setFilterSelected('Overdue')} filterSelected={filterSelected} />
        </View>
    )
}