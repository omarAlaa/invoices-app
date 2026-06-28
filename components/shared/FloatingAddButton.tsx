import { Link } from "expo-router";
import { Plus } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

type Props = {
    animatedStyle: any;
    screen?: string;
}

export default function FloatingAddButton({ animatedStyle, screen }: Props) {
    return (
        <Animated.View
            style={animatedStyle}
            className={`absolute ${screen === 'clientInvoices' ? 'bottom-16 right-12' : 'bottom-10 right-3'}`}
        >
            <Link href={screen === 'client' ? '/createEditClient' : '/createEditInvoice'} asChild>
                <TouchableOpacity className="items-center justify-center w-20 h-20 rounded-full bg-blue-200 dark:bg-blue-950">
                    <Plus size={40} color='#2563eb' />
                </TouchableOpacity>
            </Link>
        </Animated.View>
    )
}