import { Plus, UserPlus } from "lucide-react-native";
import { useState } from "react";
import { Modal, Text, View, useColorScheme } from "react-native";
import CreateEditClient from "../createEditClientScreen/CreateEditClient";
import CreateEditInvoice from "../createEditinvoiceScreen/CreateEditInvoice";
import ActionButton from "../shared/ActionButton";
import TextField from "../shared/TextField";

export default function AddButtons() {
    const systemColorScheme = useColorScheme()
    const [showClientModal, setShowClientModal] = useState(false)
    const [showInvoiceModal, setShowInvoiceModal] = useState(false)


    return (
        <View className="flex-row gap-2">
            <ActionButton onPress={() => setShowInvoiceModal(true)}>
                <Plus color='#2563eb' />

                <Text className="text-blue-600 font-bold text-lg">New invoice</Text>
            </ActionButton>

            <ActionButton isSecondary={true} onPress={() => setShowClientModal(true)}>
                <UserPlus color={systemColorScheme === 'dark' ? 'white' : 'black'} />

                <TextField text="Add client" className="font-bold text-lg" />
            </ActionButton>

            <Modal
                visible={showClientModal}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowClientModal(false)}
            >
                <CreateEditClient type='New' onClose={() => setShowClientModal(false)} />
            </Modal>

            <Modal
                visible={showInvoiceModal}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowInvoiceModal(false)}
            >
                <CreateEditInvoice type='New' onClose={() => setShowInvoiceModal(false)} />
            </Modal>
        </View>
    )
}