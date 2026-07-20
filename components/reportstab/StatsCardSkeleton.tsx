import { View } from "react-native";
import Card from "../shared/Card";
import SkeletonBlock from "../shared/SkeletonBlock";

export default function StatsCardsSkeleton() {
    return (
        <View className="gap-2">
            {Array.from({ length: 2 }).map((_, index) => (
                <View key={index} className="flex-row justify-between gap-4">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <Card key={index} className="gap-2">
                            <SkeletonBlock className="w-24 h-5" />

                            <SkeletonBlock className="w-16 h-5" />
                        </Card>
                    ))}
                </View>
            ))}
        </View>
    )
}