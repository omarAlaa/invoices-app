import { Plus } from "lucide-react-native";
import { TouchableOpacity, useColorScheme } from "react-native";
import Animated from "react-native-reanimated";

type Props = {
    animatedStyle: any;
};

export default function FloatingAddButton({ animatedStyle }: Props) {
    const systemColorScheme = useColorScheme();

    return (
        <Animated.View
            style={animatedStyle}
            className="absolute bottom-5 right-3"
        >
            <TouchableOpacity className="items-center justify-center w-20 h-20 rounded-full bg-blue-200 dark:bg-blue-950">
                <Plus size={40} color='#2563eb' />
            </TouchableOpacity>
        </Animated.View>
    );
}