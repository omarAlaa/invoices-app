import { Trash2 } from "lucide-react-native";
import { TouchableOpacity, View, useColorScheme } from "react-native";
import Card from "../shared/Card";
import InputField from "../shared/InputField";
import TextField from "../shared/TextField";

export default function ItemCard() {
    const isDark = useColorScheme() === 'dark'
    return (
        <Card>
            <View className="flex-row justify-between">
                <TextField text="Website maintenance" className="font-bold text-lg" />

                <TouchableOpacity>
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
    )
}