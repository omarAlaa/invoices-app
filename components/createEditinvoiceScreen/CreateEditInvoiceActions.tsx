import { useCreateInvoice } from "@/features/invoices/api";
import { useInvoiceDraftStore } from "@/store/useInvoiceDraftStore";
import { router } from "expo-router";
import { Alert, Text, View } from "react-native";
import ActionButton from "../shared/ActionButton";
import TextField from "../shared/TextField";

export default function CreateEditInvoiceActions() {
    const draftInvoice = useInvoiceDraftStore()
    const createInvoice = useCreateInvoice()

    const handleCreateInvoice = async () => {
        if (!draftInvoice.selectedClient) {
            Alert.alert('Pick a client first')
            return
        }
        if (draftInvoice.invoiceItems.length === 0) {
            Alert.alert('Add at least one item')
            return
        }

        try {
            await createInvoice.mutateAsync({
                clientId: draftInvoice.selectedClient.id,
                issueDate: draftInvoice.issueDate,
                dueDate: draftInvoice.dueDate,
                taxRate: draftInvoice.taxRate,
                discountAmount: draftInvoice.discountAmount,
                items: draftInvoice.invoiceItems,
                status: draftInvoice.invoiceStatus,
            })
            Alert.alert('Invoice created')
            draftInvoice.reset()
            router.back()
        } catch (err) {
            Alert.alert('Could not save invoice', (err as Error).message)
        }
    }

    return (
        <View className="flex-row gap-2 p-2">
            <ActionButton isSecondary>
                <TextField text="Save as draft" className="font-bold text-lg" />
            </ActionButton>

            <ActionButton onPress={handleCreateInvoice}>
                <Text className="text-blue-600 font-bold text-lg">Create invoice</Text>
            </ActionButton>
        </View>
    )
}