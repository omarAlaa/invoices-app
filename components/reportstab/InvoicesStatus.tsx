import { useEffect, useState } from "react";
import { View } from "react-native";
import TextField from "../shared/TextField";

type Props = {
    statusBreakdown: {
        paid: number;
        pending: number;
        overdue: number;
    }
    | undefined;
    invsCount: number | undefined;
}

export default function InvoicesStatus({ statusBreakdown, invsCount = 0 }: Props) {
    const [segments, setSegments] = useState([
        { label: 'Paid', number: 0, color: 'bg-green-600' },
        { label: 'Pending', number: 0, color: 'bg-yellow-600' },
        { label: 'Overdue', number: 0, color: 'bg-red-700' },
    ])

    useEffect(() => {
        setSegments([
            { label: 'Paid', number: statusBreakdown?.paid || 0, color: 'bg-green-600' },
            { label: 'Pending', number: statusBreakdown?.pending || 0, color: 'bg-yellow-600' },
            { label: 'Overdue', number: statusBreakdown?.overdue || 0, color: 'bg-red-700' },
        ])
    }, [statusBreakdown])

    return (
        <View className="gap-2">
            <TextField text="Invoices status" className="font-bold text-lg" />

            <View className="flex-row rounded-full overflow-hidden h-2.5">
                {segments.map((seg) => (
                    <View
                        key={seg.label}
                        className={seg.color}
                        style={{ flex: seg.number }}
                    />
                ))}
            </View>

            <View className="flex-row justify-between gap-4">
                {segments.map((seg) => (
                    <View key={seg.label} className="flex-row items-center gap-1">
                        <View className={`w-2 h-2 rounded-full ${seg.color}`} />

                        <TextField text={`${seg.label} ${(seg.number / invsCount) * 100}%`} type="secondary" />
                    </View>
                ))}
            </View>
        </View>
    )
}