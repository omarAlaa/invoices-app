import { InvoiceItem, InvoiceListRow, NewInvoiceItem } from "@/lib/definitons"
import { useInvoiceDraftStore } from "@/store/useInvoiceDraftStore"
import { router } from "expo-router"
import { Ellipsis } from "lucide-react-native"
import { Alert, TouchableOpacity, useColorScheme } from "react-native"
import AnimatedMenu from "../shared/AnimatedMenu"

type Props = {
    screen: string;
    object: InvoiceListRow | undefined;
    items?: InvoiceItem[] | undefined;
}

export default function OptionsMenu({ screen, object, items }: Props) {
    const { setInvoice, setClientName } = useInvoiceDraftStore()
    const systemColorScheme = useColorScheme()

    const handleMenuSelect = (id: string) => {
        if (id === 'edit') {
            if (screen === 'invoice' && object && items) {
                const invItems: NewInvoiceItem[] = items.map(item => { return { id: item.id, title: item.title, quantity: item.quantity.toString(), rate: item.rate.toString() } })
                setInvoice(object.id, object.client_id, new Date(object.issue_date), new Date(object.due_date), invItems, object?.status)
                setClientName(`${object.client_first_name}  ${object.client_last_name}`)
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