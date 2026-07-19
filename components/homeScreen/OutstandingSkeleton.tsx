import { View } from "react-native";
import Card from "../shared/Card";
import SkeletonBlock from "../shared/SkeletonBlock";

export default function OutstandingSkeleton() {
    return (
        <Card>
            <SkeletonBlock className="h-5 w-32" />
            <SkeletonBlock className="h-11 w-40 mt-3" />

            <View className="my-8 border-b border-gray-400" />

            <View className="flex-row justify-between">
                <View className="gap-2">
                    <SkeletonBlock className="h-6 w-14" />
                    <SkeletonBlock className="h-6 w-16" />
                </View>
                <View className="gap-2">
                    <SkeletonBlock className="h-6 w-14" />
                    <SkeletonBlock className="h-6 w-16" />
                </View>
                <View className="gap-2">
                    <SkeletonBlock className="h-6 w-14" />
                    <SkeletonBlock className="h-6 w-16" />
                </View>
            </View>
        </Card>
    )
}