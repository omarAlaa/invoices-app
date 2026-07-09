import { useCreateClient } from "@/features/clients/api";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import ActionButton from "../shared/ActionButton";
import InputField from "../shared/InputField";
import TextField from "../shared/TextField";

export default function ClientForm() {
    const createClient = useCreateClient()
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const router = useRouter()

    const handleCreateEditClient = async () => {
        try {
            await createClient.mutateAsync({
                first_name: fName,
                last_name: lName,
                email: email,
                phone: phone,
            })

            Alert.alert('Client created')
            router.back()
        } catch (error) {
            Alert.alert('Could not create client')
        }
    }

    return (
        <View className="gap-4">
            <View className="gap-2">
                <TextField text="First name" type="secondary" />

                <InputField value={fName} setValue={setFName} />
            </View>

            <View className="gap-2">
                <TextField text="Last name" type="secondary" />

                <InputField value={lName} setValue={setLName} />
            </View>

            <View className="gap-2">
                <TextField text="Email" type="secondary" />

                <InputField type="email" value={email} setValue={setEmail} />
            </View>

            <View className="gap-2 mb-4">
                <TextField text="Phone" type="secondary" />

                <InputField type="tel" value={phone} setValue={setPhone} />
            </View>

            <ActionButton onPress={handleCreateEditClient}>
                <TextField text="Save client" type="highlighted" />
            </ActionButton>
        </View>
    )
}