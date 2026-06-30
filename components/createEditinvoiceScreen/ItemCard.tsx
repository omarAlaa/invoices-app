import { Trash2 } from "lucide-react-native";
import { TextInput, TouchableOpacity, View, useColorScheme } from "react-native";
import Animated, { Easing, FadeInDown, FadeOutLeft } from "react-native-reanimated";
import Card from "../shared/Card";
import InputField from "../shared/InputField";
import TextField from "../shared/TextField";

export type InvoiceItem = {
    id: number;
    name: string;
    quantity: string;
    rate: string;
}

type ItemCardProps = {
    item: InvoiceItem;
    autoFocus?: boolean;
    onRemove?: () => void;
    onChange?: (item: InvoiceItem) => void;
}

export default function ItemCard({ item, autoFocus = false, onRemove, onChange }: ItemCardProps) {
    const isDark = useColorScheme() === 'dark'

    const quantity = Number(item.quantity) || 0
    const rate = Number(item.rate) || 0
    const amount = (quantity * rate).toFixed(2)

    return (
        <Animated.View entering={FadeInDown.duration(250).springify()} exiting={FadeOutLeft
            .duration(200)
            .easing(Easing.inOut(Easing.quad))}>
            <Card>
                <View className="flex-row justify-between">
                    <TextInput
                        autoFocus={autoFocus}
                        className="dark:text-white flex-1"
                        value={item.name}
                        onChangeText={(name) => onChange?.({ ...item, name })}
                        placeholder="Item description"
                        placeholderTextColor="gray"
                    />

                    <TouchableOpacity onPress={onRemove} hitSlop={8}>
                        <Trash2 color={isDark ? 'white' : 'black'} />
                    </TouchableOpacity>
                </View>

                <View className="flex-row gap-2 mt-4">
                    <View className="flex-1 gap-2">
                        <TextField text="Qty" type="secondary" />

                        <InputField
                            value={item.quantity}
                            setValue={(quantity) => onChange?.({ ...item, quantity })}
                            isNumeric
                            placeholder="0"
                        />
                    </View>
                    <View className="flex-1 gap-2">
                        <TextField text="Rate" type="secondary" />

                        <InputField
                            value={item.rate}
                            setValue={(rate) => onChange?.({ ...item, rate })}
                            isCurrency
                            placeholder="0.00"
                        />
                    </View>
                    <View className="flex-1 gap-2">
                        <TextField text="Amount" type="secondary" />

                        <InputField value={amount} notEditable />
                    </View>
                </View>
            </Card>
        </Animated.View>
    )
}