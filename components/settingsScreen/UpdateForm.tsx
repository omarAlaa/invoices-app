import { updateProfile } from "@/lib/actions";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function UpdateForm() {
    const { email, firstName, lastName, setName } = useAuthStore()
    const [fName, setFName] = useState(firstName)
    const [lName, setLName] = useState(lastName)
    const [loading, setLoading] = useState(false)
    const bttnDisabled = loading || (fName === firstName && lName === lastName)
    const [focusedField, setFocusedField] = useState('')

    const handleUpdate = async () => {
        try {
            setLoading(true)

            updateProfile({ first_name: fName || '', last_name: lName || '' })
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
                <Text>Email</Text>

                <TextInput
                    value={email || ''}
                    editable={false}
                    selectTextOnFocus={false}
                    className='p-4 opacity-50 border-2 bg-gray-200 rounded-xl border-gray-300'
                />
            </View>

            <View className="gap-2">
                <Text>First name</Text>

                <TextInput
                    value={fName || ''}
                    onFocus={() => setFocusedField('firstName')}
                    onBlur={() => setFocusedField('')}
                    onChangeText={setFName}
                    className={`p-4 border-2 bg-gray-200 rounded-xl ${focusedField === 'firstName' ? 'border-blue-600' : 'border-gray-300'}`}
                />
            </View>

            <View className="gap-2">
                <Text>Last name</Text>

                <TextInput
                    value={lName || ''}
                    onFocus={() => setFocusedField('lastName')}
                    onBlur={() => setFocusedField('')}
                    onChangeText={setLName}
                    className={`p-4 border-2 bg-gray-200 rounded-xl ${focusedField === 'lastName' ? 'border-blue-600' : 'border-gray-300'}`}
                />
            </View>

            <TouchableOpacity
                className={`flex-row gap-2 justify-center items-center bg-sky-800 rounded-full p-4 ${bttnDisabled && !loading ? 'opacity-40' : ''}`}
                disabled={bttnDisabled}
                onPress={handleUpdate}>
                <Text className='color-white font-bold text-xl'>Update</Text>

                {loading && <ActivityIndicator color={'white'} />}
            </TouchableOpacity>
        </View>
    )
}