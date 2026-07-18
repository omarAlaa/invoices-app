import { useCreateClient, useUpdateClient } from "@/features/clients/api";
import { useClientDraftStore } from "@/store/useClientDraftStore";
import { useRouter } from "expo-router";
import { Alert, View } from "react-native";
import ActionButton from "../shared/ActionButton";
import InputField from "../shared/InputField";
import TextField from "../shared/TextField";

type Props = {
    type: string | string[];
}

export default function ClientForm({ type }: Props) {
    const createClient = useCreateClient()
    const updateClient = useUpdateClient()
    const { id, firstName, setFirstName, lastName, setLastName, email, setEmail, phone, setPhone, reset } = useClientDraftStore()
    const router = useRouter()

    const handleCreateClient = async () => {
        try {
            await createClient.mutateAsync({
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
            })

            Alert.alert('Client created')
            router.back()
        } catch (error) {
            Alert.alert('Could not create client')
        }
    }

    const handleUpdateClient = async () => {
        try {
            await updateClient.mutateAsync({
                id,
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
            })

            Alert.alert('Client updated')
            reset()
            router.back()
        } catch (error) {
            Alert.alert('Could not create client')
        }
    }

    return (
        <View className="gap-4">
            <View className="gap-2">
                <TextField text="First name" type="secondary" />

                <InputField value={firstName} setValue={setFirstName} />
            </View>

            <View className="gap-2">
                <TextField text="Last name" type="secondary" />

                <InputField value={lastName} setValue={setLastName} />
            </View>

            <View className="gap-2">
                <TextField text="Email" type="secondary" />

                <InputField type="email" value={email} setValue={setEmail} />
            </View>

            <View className="gap-2 mb-4">
                <TextField text="Phone" type="secondary" />

                <InputField type="tel" value={phone} setValue={setPhone} />
            </View>

            {
                type === 'New' ?
                    <ActionButton onPress={handleCreateClient}>
                        <TextField text="Save client" type="highlighted" />
                    </ActionButton>
                    :
                    <ActionButton onPress={handleUpdateClient}>
                        <TextField text="Update client" type="highlighted" />
                    </ActionButton>
            }
        </View>
    )
}