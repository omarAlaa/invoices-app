import { Client, InvoiceItem, InvoiceListRow, NewInvoiceItem } from "@/lib/definitons"
import { useClientDraftStore } from "@/store/useClientDraftStore"
import { useInvoiceDraftStore } from "@/store/useInvoiceDraftStore"
import { router } from "expo-router"
import { Ellipsis } from "lucide-react-native"
import { Alert, TouchableOpacity, useColorScheme } from "react-native"
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
    const systemColorScheme = useColorScheme()

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

            router.navigate({
                pathname: screen === 'invoice' ? '/createEditInvoice' : '/createEditClient',
                params: { type: 'Edit' }
            })
        } else {
            Alert.alert(
                `Delete ${screen}`,
                `Are you sure you want to delete this ${screen} ?`,
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => { }
                    }
                ]
            )
        }
    }

    return (
        <AnimatedMenu
            onPressAction={handleMenuSelect}
            actions={[
                { id: 'edit', title: 'Edit' },
                { id: 'delete', title: 'Delete', destructive: true },
            ]}
        >
            <TouchableOpacity className="flex-1 justify-center items-end w-14">
                <Ellipsis color={systemColorScheme === 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>
        </AnimatedMenu>
    )
}