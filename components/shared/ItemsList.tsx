import FloatingAddButton from "@/components/shared/FloatingAddButton";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming, } from "react-native-reanimated";

interface Props extends PropsWithChildren {
    screen: string,
}

export default function ItemsList({ children, screen }: Props) {
    const previousScrollY = useSharedValue(0)
    const isVisible = useSharedValue(true)

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
    })

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
        }
    })

    return (
        <View className="flex-1 mb-[-4rem]">
            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentContainerClassName="gap-7 pb-11"
            >
                {children}
            </Animated.ScrollView>

            <FloatingAddButton animatedStyle={buttonStyle} screen={screen} />
        </View>
    )
}