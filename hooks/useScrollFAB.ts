import { useCallback } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming, } from "react-native-reanimated";

export function useScrollFAB() {
    const previousScrollY = useSharedValue(0);
    const isVisible = useSharedValue(true);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const currentY = event.contentOffset.y
            if (currentY > previousScrollY.value + 10) {
                isVisible.value = false
            }
            else if (currentY < previousScrollY.value - 10) {
                isVisible.value = true
            }

            previousScrollY.value = currentY
        },
    })

    const onScroll = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const currentY = event.nativeEvent.contentOffset.y
            if (currentY > previousScrollY.value + 10) {
                isVisible.value = false
            }
            else if (currentY < previousScrollY.value - 10) {
                isVisible.value = true
            }

            previousScrollY.value = currentY
        },
        [],
    )

    const buttonStyle = useAnimatedStyle(() => ({
        opacity: withTiming(isVisible.value ? 1 : 0, { duration: 200 }),
        transform: [
            { translateY: withTiming(isVisible.value ? 0 : 20, { duration: 200 }) },
            { scale: withTiming(isVisible.value ? 1 : 0.9, { duration: 200 }) },
        ],
    }))

    return { scrollHandler, onScroll, buttonStyle }
}