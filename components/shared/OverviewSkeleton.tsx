import { View } from "react-native";
import SkeletonBlock from "./SkeletonBlock";

type Props = {
    isInvoice?: boolean;
    isClientInvoice?: boolean;
}

export default function OverviewSkeleton({ isInvoice, isClientInvoice }: Props) {
    return (
        <View className="flex-row justify-between">
            <View className="flex-row gap-2 items-center">
                {!isClientInvoice && <SkeletonBlock className="w-12 h-12 bg-blue-200" isCircle />}

                <View className="gap-2">
                    <SkeletonBlock className="w-20 h-5" />

                    <SkeletonBlock className="w-48 h-5" />
                </View>
            </View>

            {isInvoice || isClientInvoice && <View className="justify-center items-end gap-2">
                <SkeletonBlock className="w-20 h-5" />

                <SkeletonBlock className="w-24 h-8" isCircle />
            </View>}
        </View>
    )
}