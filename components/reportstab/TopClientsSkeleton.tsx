import { View } from "react-native";
import SkeletonBlock from "../shared/SkeletonBlock";
import TextField from "../shared/TextField";

export default function TopClientsSkeleton() {
    return (
        <View className="gap-1">
            <TextField text="Top clients" className="font-bold text-lg" /><View className="gap-2" />

            <View className="gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                    <View key={index} className="flex-row justify-between items-center py-2">
                        <SkeletonBlock className="w-36 h-5" />

                        <SkeletonBlock className="w-20 h-5" />
                    </View>
                ))}
            </View>
        </View>
    )
}