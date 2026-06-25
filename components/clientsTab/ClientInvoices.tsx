import FloatingAddButton from "@/components/shared/FloatingAddButton";
import InvoiceOverview from "@/components/shared/InvoiceOverview";
import { View } from "react-native";
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming, } from "react-native-reanimated";
import TextField from "../shared/TextField";

export default function CLientInvoices() {
    const previousScrollY = useSharedValue(0);
    const isVisible = useSharedValue(true);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const currentY = event.contentOffset.y;

            if (currentY > previousScrollY.value + 10) {
                isVisible.value = false;
            } else if (currentY < previousScrollY.value - 10) {
                isVisible.value = true;
            }

            previousScrollY.value = currentY;
        },
    });

    const buttonStyle = useAnimatedStyle(() => {

        return {
            opacity: withTiming(isVisible.value ? 1 : 0, {
                duration: 200,
            }),
            transform: [
                {
                    translateY: withTiming(
                        isVisible.value ? 0 : 20,
                        { duration: 200 }
                    ),
                },
                {
                    scale: withTiming(
                        isVisible.value ? 1 : 0.9,
                        { duration: 200 }
                    ),
                },
            ],
        };
    });

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