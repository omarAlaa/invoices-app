import { updateProfile } from "@/lib/actions";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import ActionButton from "../shared/ActionButton";
import InputField from "../shared/InputField";

export default function UpdateForm() {
    const { email, firstName, lastName, setName } = useAuthStore()
    const [fName, setFName] = useState(firstName)
    const [lName, setLName] = useState(lastName)
    const [loading, setLoading] = useState(false)
    const bttnDisabled = loading || (fName === firstName && lName === lastName)

    const handleUpdate = async () => {
        try {
            setLoading(true)

            await updateProfile({ first_name: fName || '', last_name: lName || '' })
            setName(fName, lName)
            alert('Profile updated')
        } catch (error: any) {
            Alert.alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className="gap-10">
            <View className="gap-2">
                <Text className="dark:text-white">Email</Text>

                <InputField value={email || ''} notEditable={true} />
            </View>

            <View className="gap-2">
                <Text className="dark:text-white">First name</Text>

                <InputField value={fName || ''} setValue={setFName} />
            </View>

            <View className="gap-2">
                <Text className="dark:text-white">Last name</Text>

                <InputField value={lName || ''} setValue={setLName} />
            </View>

            <ActionButton
                label="Update"
                loading={loading}
                bttnDisabled={bttnDisabled}
                onPress={handleUpdate} />
        </View>
    )
}