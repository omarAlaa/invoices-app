import FloatingAddButton from "@/components/shared/FloatingAddButton";
import InvoiceOverview from "@/components/shared/InvoiceOverview";
import { useScrollFAB } from "@/hooks/useScrollFAB";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import TextField from "../shared/TextField";

export default function CLientInvoices() {
    const { scrollHandler, buttonStyle } = useScrollFAB()

    return (
        <View className="flex-1 gap-2">
            <TextField text="Invoices" className="font-bold text-lg" />

            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentContainerClassName="gap-7 pb-11"
            >
                {Array.from({ length: 20 }).map((_, index) => (
                    <InvoiceOverview key={index} />
                ))}
            </Animated.ScrollView>

            <FloatingAddButton animatedStyle={buttonStyle} />
        </View>
    )
}