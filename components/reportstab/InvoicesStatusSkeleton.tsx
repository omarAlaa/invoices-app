import { View } from "react-native";
import SkeletonBlock from "../shared/SkeletonBlock";
import TextField from "../shared/TextField";

export default function InvoicesStatusSkeleton() {
    return (
        <View className="gap-2">
            <TextField text="Invoices status" className="font-bold text-lg" />

            <SkeletonBlock className="w-full h-2.5" isCircle />

            <View className="flex-row justify-between gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <View key={index} className="flex-row items-center gap-1">
                        <SkeletonBlock className="w-2 h-2" isCircle />

                        <SkeletonBlock className="w-16 h-5" />
                    </View>
                ))}
            </View>
        </View>
    )
}