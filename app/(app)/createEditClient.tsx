import ClientForm from "@/components/createEditClientScreen/ClientForm";
import AvatarController from "@/components/settingsScreen/AvatarController";
import ActionButton from "@/components/shared/ActionButton";
import TextField from "@/components/shared/TextField";
import { Stack, useLocalSearchParams } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function CreateEditClient() {
    const { type } = useLocalSearchParams()

    return (
        <KeyboardAwareScrollView className="flex-1" bottomOffset={40}>
            <View className="flex-1 p-8 gap-8">
                <Stack.Screen
                    options={{
                        title: `${type} client`,
                        headerBackButtonDisplayMode: 'minimal',
                        headerShadowVisible: false,
                        headerRight: () => (
                            <TouchableOpacity>
                                <TextField text="Save" type="highlighted" />
                            </TouchableOpacity>
                        )
                    }}
                />

                <AvatarController />

                <ClientForm />

                <ActionButton>
                    <TextField text="Save client" type="highlighted" />
                </ActionButton>
            </View>
        </KeyboardAwareScrollView>
    );
}