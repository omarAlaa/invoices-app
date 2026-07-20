import { View } from "react-native";
import Card from "../shared/Card";
import SkeletonBlock from "../shared/SkeletonBlock";

export default function InvoiceInfoSkeleton() {
    return (
        <Card>
            <View className="flex-row gap-2 items-center">
                <SkeletonBlock className="w-12 h-12 bg-blue-200" isCircle />

                <View className="gap-2">
                    <SkeletonBlock className="w-20 h-5" />

                    <SkeletonBlock className="w-48 h-5" />
                </View>
            </View>

            <View className="my-8 border-b border-gray-400" />

            <View className="flex-row justify-between">
                <View className="gap-2">
                    <SkeletonBlock className="w-14 h-5" />

                    <SkeletonBlock className="w-28 h-5" />
                </View>

                <View className="gap-2">
                    <SkeletonBlock className="w-14 h-5" />

                    <SkeletonBlock className="w-28 h-5" />
                </View>
            </View>
        </Card>
    )
}