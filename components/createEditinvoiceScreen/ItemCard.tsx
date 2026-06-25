import { Trash2 } from "lucide-react-native";
import { TextInput, TouchableOpacity, View, useColorScheme } from "react-native";
import Animated, { Easing, FadeInDown, FadeOutLeft } from "react-native-reanimated";
import Card from "../shared/Card";
import InputField from "../shared/InputField";
import TextField from "../shared/TextField";

type ItemCardProps = {
    autoFocus?: boolean;
    onRemove?: () => void;
}

export default function ItemCard({ autoFocus = false, onRemove }: ItemCardProps) {
    const isDark = useColorScheme() === 'dark'

    return (
        <Animated.View entering={FadeInDown.duration(250).springify()} exiting={FadeOutLeft
            .duration(200)
            .easing(Easing.inOut(Easing.quad))}>
            <Card>
                <View className="flex-row justify-between">
                    <TextInput
                        autoFocus={autoFocus}
                        className="font-bold text-lg dark:text-white flex-1 mr-2"
                    />

                    <TouchableOpacity onPress={onRemove}>
                        <Trash2 color={isDark ? 'white' : 'black'} />
                    </TouchableOpacity>
                </View>

                <View className="flex-row gap-2 mt-4">
                    <View className="flex-1 gap-2">
                        <TextField text="Qty" type="secondary" />

                        <InputField value="4" type="numeric" />
                    </View>
                    <View className="flex-1 gap-2">
                        <TextField text="Rate" type="secondary" />

                        <InputField value="20" type="decimal" />
                    </View>
                    <View className="flex-1 gap-2">
                        <TextField text="Amount" type="secondary" />

                        <InputField value="100" notEditable />
                    </View>
                </View>
            </Card>
        </Animated.View>
    )
}