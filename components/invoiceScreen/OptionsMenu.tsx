import { useArchiveClient } from "@/features/clients/api"
import { useDeleteInvoice } from "@/features/invoices/api"
import { Client, InvoiceItem, InvoiceListRow, NewInvoiceItem } from "@/lib/definitons"
import { useClientDraftStore } from "@/store/useClientDraftStore"
import { useInvoiceDraftStore } from "@/store/useInvoiceDraftStore"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { router } from "expo-router"
import { Ellipsis } from "lucide-react-native"
import { useState } from "react"
import { Alert, Modal, TouchableOpacity, useColorScheme, View } from "react-native"
import CreateEditClient from "../createEditClientScreen/CreateEditClient"
import CreateEditInvoice from "../createEditinvoiceScreen/CreateEditInvoice"
import AnimatedMenu from "../shared/AnimatedMenu"

type Props = {
    screen: string;
    invoice?: InvoiceListRow | undefined;
    client?: Client | undefined;
    items?: InvoiceItem[] | undefined;
}

export default function OptionsMenu({ screen, invoice, client, items }: Props) {
    const { setInvoice, setClientName } = useInvoiceDraftStore()
    const { setClient } = useClientDraftStore()
    const deleteInvoice = useDeleteInvoice()
    const deleteClient = useArchiveClient()
    const systemColorScheme = useColorScheme()
    const [showClientModal, setShowClientModal] = useState(false)
    const [showInvoiceModal, setShowInvoiceModal] = useState(false)

    const handleMenuSelect = (id: string) => {
        if (id === 'edit') {
            if (screen === 'invoice' && invoice && items) {
                const invItems: NewInvoiceItem[] = items.map(item => { return { id: item.id, title: item.title, quantity: item.quantity.toString(), rate: item.rate.toString() } })
                setInvoice(invoice.id, invoice.client_id, new Date(invoice.issue_date), new Date(invoice.due_date), invItems, invoice.status)
                setClientName(`${invoice.client_first_name}  ${invoice.client_last_name}`)
            }

            if (screen === 'client' && client) {
                setClient(client.id, client.first_name, client.last_name || '', client.email || '', client.phone || '')
            }

            if (screen === 'client') {
                setShowClientModal(true)
            } else {
                setShowInvoiceModal(true)
            }
        } else {
            Alert.alert(
                `Delete ${screen}`,
                `Are you sure you want to delete this ${screen} ?`,
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: async () => {
                            if (screen === 'invoice' && invoice) {
                                try {
                                    await deleteInvoice.mutateAsync(invoice.id)
                                    Alert.alert('Invoice deleted')
                                    router.back()
                                } catch (err) {
                                    Alert.alert('Could not delete invoice', (err as Error).message)
                                }
                                finally {
                                    return
                                }
                            }
                            if (screen === 'client' && client) {
                                try {
                                    await deleteClient.mutateAsync(client.id)
                                    Alert.alert('Client deleted')
                                    router.back()
                                } catch (err) {
                                    Alert.alert('Could not delete client', (err as Error).message)
                                }
                            }
                        }
                    }
                ]
            )
        }
    }

    return (
        !client?.is_archived && <View className="justify-center items-center">
            <AnimatedMenu
                onPressAction={handleMenuSelect}
                actions={[
                    { id: 'edit', title: 'Edit' },
                    { id: 'delete', title: 'Delete', destructive: true },
                ]}
            >
                <TouchableOpacity className="flex-1 justify-center items-center w-14">
                    <Ellipsis color={systemColorScheme === 'dark' ? 'white' : 'black'} />
                </TouchableOpacity>
            </AnimatedMenu>

            <Modal
                visible={showClientModal}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowClientModal(false)}
            >
                <CreateEditClient type='Edit' onClose={() => setShowClientModal(false)} />
            </Modal>

            <Modal
                visible={showInvoiceModal}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowInvoiceModal(false)}
            >
                <BottomSheetModalProvider>
                    <CreateEditInvoice type='Edit' onClose={() => setShowInvoiceModal(false)} />
                </BottomSheetModalProvider>
            </Modal>
        </View>
    )
}