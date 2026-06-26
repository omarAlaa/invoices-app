import { View } from "react-native";
import TextField from "../shared/TextField";

const data = [
    { month: 'Jan', value: 3200 },
    { month: 'Feb', value: 4100 },
    { month: 'Mar', value: 3800 },
    { month: 'Apr', value: 5200 },
    { month: 'May', value: 4600 },
    { month: 'Jun', value: 6100 },
]

const max = Math.max(...data.map((d) => d.value))
const CHART_HEIGHT = 120

export default function RevenueChart() {
    return (
        <View className="gap-2">
            <TextField text="Revenue, last 6 months" className="font-bold text-lg" />

            <View className="flex-row justify-between items-end gap-4">
                {data.map((item, i) => {
                    const isCurrentMonth = i === data.length - 1
                    const barHeight = (item.value / max) * CHART_HEIGHT

                    return (
                        <View key={item.month} className="flex-1 gap-1">
                            <View
                                style={{ height: barHeight }}
                                className={`rounded-md ${isCurrentMonth ? 'bg-blue-200' : 'bg-gray-200'}`}
                            />
                            <TextField
                                text={item.month}
                                type={isCurrentMonth ? 'highlighted' : 'secondary'}
                                className={`text-center text-xs`} />
                        </View>
                    )
                })}
            </View>
        </View>
    )
}