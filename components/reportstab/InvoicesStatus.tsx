import { View } from "react-native";
import TextField from "../shared/TextField";

const segments = [
    { label: 'Paid', value: 55, color: 'bg-green-600' },
    { label: 'Pending', value: 30, color: 'bg-yellow-600' },
    { label: 'Overdue', value: 15, color: 'bg-red-700' },
]

export default function InvoicesStatus() {
    return (
        <View className="gap-2">
            <TextField text="Invoices status" className="font-bold text-lg" />

            <View className="flex-row rounded-full overflow-hidden h-2.5">
                {segments.map((seg) => (
                    <View
                        key={seg.label}
                        className={seg.color}
                        style={{ flex: seg.value }}
                    />
                ))}
            </View>

            <View className="flex-row justify-between gap-4">
                {segments.map((seg) => (
                    <View key={seg.label} className="flex-row items-center gap-1">
                        <View className={`w-2 h-2 rounded-full ${seg.color}`} />

                        <TextField text={`${seg.label} ${seg.value}%`} type="secondary" />
                    </View>
                ))}
            </View>
        </View>
    )
}