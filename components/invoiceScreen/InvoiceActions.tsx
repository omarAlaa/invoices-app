import { Download, Share2 } from "lucide-react-native";
import { Text, useColorScheme, View } from "react-native";
import ActionButton from "../shared/ActionButton";
import TextField from "../shared/TextField";

export default function InvoiceActions() {
    const systemColorScheme = useColorScheme()

    return (
        <View className="flex-row gap-2 mt-6">
            <ActionButton isSecondary>
                <Download color={systemColorScheme === 'dark' ? 'white' : 'black'} />

                <TextField text="PDF" className="font-bold text-lg" />
            </ActionButton>

            <ActionButton>
                <Share2 color='#2563eb' />

                <Text className="text-blue-600 font-bold text-lg">Share</Text>
            </ActionButton>
        </View>
    )
}