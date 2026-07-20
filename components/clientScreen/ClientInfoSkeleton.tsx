import { View } from "react-native";
import SkeletonBlock from "../shared/SkeletonBlock";

export default function ClientInfoSkeleton() {
    return (
        <View className="items-center gap-2">
            <SkeletonBlock className="w-20 h-20 bg-blue-200" isCircle />

            <SkeletonBlock className="w-36 h-5" />

            <SkeletonBlock className="w-24 h-5" />
        </View>
    )
}