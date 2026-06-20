import TextField from "@/components/shared/TextField";
import { Funnel, Search } from "lucide-react-native";
import { TouchableOpacity, View, useColorScheme } from "react-native";

export default function InvoicesHeader() {
    const systemColorScheme = useColorScheme()

    return (
        <View className="flex-row justify-between items-center">
            <TextField text="Invocies" className="text-3xl font-bold" />

            <View className="flex-row gap-8">
                <TouchableOpacity>
                    <Search color={systemColorScheme === 'dark' ? 'white' : 'black'} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Funnel color={systemColorScheme === 'dark' ? 'white' : 'black'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}