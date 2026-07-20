import { View } from "react-native";
import SkeletonBlock from "../shared/SkeletonBlock";

export default function InvItemSkeleton() {
    return (
        <View className="flex-row justify-between items-baseline">
            <View className="gap-2">
                <SkeletonBlock className="w-32 h-6" />

                <SkeletonBlock className="w-16 h-6" />
            </View>

            <SkeletonBlock className="w-20 h-6" />
        </View>
    )
}