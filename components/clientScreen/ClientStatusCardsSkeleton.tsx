import { View } from "react-native";
import Card from "../shared/Card";
import SkeletonBlock from "../shared/SkeletonBlock";

export default function ClientStatusCardsSkeleton() {
    return (
        <View className="flex-row justify-between gap-4">
            <Card className="gap-2">
                <SkeletonBlock className="w-16 h-6" />

                <SkeletonBlock className="w-24 h-6" />
            </Card>

            <Card className="gap-2">
                <SkeletonBlock className="w-16 h-6" />

                <SkeletonBlock className="w-24 h-6" />
            </Card>

            <Card className="gap-2">
                <SkeletonBlock className="w-16 h-6" />

                <SkeletonBlock className="w-24 h-6" />
            </Card>
        </View>
    )
}