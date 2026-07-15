import { useCreateInvoice, useUpdateInvoice } from "@/features/invoices/api";
import { useInvoiceDraftStore } from "@/store/useInvoiceDraftStore";
import { router } from "expo-router";
import { Alert, Text, View } from "react-native";
import ActionButton from "../shared/ActionButton";
import TextField from "../shared/TextField";

type Props = {
    type: string | string[];
}

export default function CreateEditInvoiceActions({ type }: Props) {
    const draftInvoice = useInvoiceDraftStore()
    const createInvoice = useCreateInvoice()
    const updateInvoice = useUpdateInvoice()

    const handleCreateInvoice = async () => {
        if (!draftInvoice.selectedClientId) {
            Alert.alert('Pick a client first')
            return
        }
        if (draftInvoice.invoiceItems.length === 0) {
            Alert.alert('Add at least one item')
            return
        }

        try {
            await createInvoice.mutateAsync({
                clientId: draftInvoice.selectedClientId,
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

    const handleUpdateInvoice = async () => {
        if (!draftInvoice.selectedClientId) {
            Alert.alert('Pick a client first')
            return
        }
        if (draftInvoice.invoiceItems.length === 0) {
            Alert.alert('Add at least one item')
            return
        }

        try {
            await updateInvoice.mutateAsync({
                id: draftInvoice.id,
                clientId: draftInvoice.selectedClientId,
                issueDate: draftInvoice.issueDate,
                dueDate: draftInvoice.dueDate,
                taxRate: draftInvoice.taxRate,
                status: draftInvoice.invoiceStatus,
            })
            Alert.alert('Invoice updated')
            draftInvoice.reset()
            router.back()
        } catch (err) {
            Alert.alert('Could not update invoice', (err as Error).message)
        }
    }

    return (

        type === 'New' ?
            <View className="flex-row gap-2 p-2">
                <ActionButton isSecondary>
                    <TextField text="Save as draft" className="font-bold text-lg" />
                </ActionButton>

                <ActionButton onPress={handleCreateInvoice}>
                    <Text className="text-blue-600 font-bold text-lg">Create invoice</Text>
                </ActionButton>
            </View>
            :
            <ActionButton onPress={handleUpdateInvoice}>
                <Text className="text-blue-600 font-bold text-lg">Update invoice</Text>
            </ActionButton>

    )
}