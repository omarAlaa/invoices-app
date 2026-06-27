import FloatingAddButton from "@/components/shared/FloatingAddButton";
import { useScrollFAB } from "@/hooks/useScrollFAB";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

interface Props extends PropsWithChildren {
    screen: string,
}

export default function ItemsList({ children, screen }: Props) {
    const { scrollHandler, buttonStyle } = useScrollFAB()

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