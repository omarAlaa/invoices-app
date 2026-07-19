import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default function SkeletonBlock({ className, isCircle }: { className?: string, isCircle?: boolean }) {
    const opacity = useRef(new Animated.Value(0.3)).current

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ])
        )
        pulse.start()
        return () => pulse.stop()
    }, [opacity])

    return (
        <Animated.View
            className={`bg-zinc-400 dark:bg-zinc-600 ${isCircle ? 'rounded-full' : 'rounded-md'} ${className}`}
            style={{ opacity }}
        />
    )
}