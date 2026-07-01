import { useCallback } from "react";
import { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming, } from "react-native-reanimated";

export function useScrollFAB() {
    const previousScrollY = useSharedValue(0);
    const isVisible = useSharedValue(true);
    const isTitleVisible = useSharedValue(false);
    const headerHeight = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const currentY = event.contentOffset.y

            if (currentY > previousScrollY.value + 10) {
                isVisible.value = false
            }
            else if (currentY < previousScrollY.value - 10) {
                isVisible.value = true
            }

            if (headerHeight.value > 0) {
                isTitleVisible.value = currentY > headerHeight.value
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

            if (headerHeight.value > 0) {
                isTitleVisible.value = currentY > headerHeight.value
            }

            previousScrollY.value = currentY
        },
        [],
    )

    const onScrollNoFAB = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const currentY = event.nativeEvent.contentOffset.y

            if (headerHeight.value > 0) {
                isTitleVisible.value = currentY > headerHeight.value
            }

            previousScrollY.value = currentY
        },
        [],
    )

    const onHeaderLayout = useCallback((event: LayoutChangeEvent) => {
        headerHeight.value = event.nativeEvent.layout.height
    }, [])

    const buttonStyle = useAnimatedStyle(() => ({
        opacity: withTiming(isVisible.value ? 1 : 0, { duration: 200 }),
        transform: [
            { translateY: withTiming(isVisible.value ? 0 : 20, { duration: 200 }) },
            { scale: withTiming(isVisible.value ? 1 : 0.9, { duration: 200 }) },
        ],
    }))

    const titleStyle = useAnimatedStyle(() => ({
        opacity: withTiming(isTitleVisible.value ? 1 : 0, { duration: 200 }),
    }))

    return { scrollHandler, onScroll, onScrollNoFAB, onHeaderLayout, buttonStyle, titleStyle }
}