import { View } from "react-native";
import SkeletonBlock from "../shared/SkeletonBlock";
import TextField from "../shared/TextField";

export default function RevenueChartSkeleton() {
    return (
        <View className="gap-2">
            <TextField text="Revenue, last 6 months" className="font-bold text-lg mb-4" />

            <View className="flex-row justify-between items-end gap-4 mt-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <View key={index} className="flex-1 gap-1 mt-6">
                        <SkeletonBlock className='h-20 w-8' />

                        <SkeletonBlock className="w-6 h-2" />
                    </View>
                ))}
            </View>
        </View >
    )
}