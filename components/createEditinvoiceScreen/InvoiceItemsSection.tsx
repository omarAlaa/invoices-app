import { useDeleteInvoiceItem } from "@/features/invoices/api";
import { NewInvoiceItem } from "@/lib/definitons";
import { useInvoiceDraftStore } from "@/store/useInvoiceDraftStore";
import { Alert, TouchableOpacity, View } from "react-native";
import TextField from "../shared/TextField";
import ItemCard from "./ItemCard";
import TotalPriceCard from "./TotalPriceCard";

type Props = {
    hasItems: boolean;
}

export default function InvoiceItemsSection({ hasItems }: Props) {
    const { invoiceItems, addItem, setInvoiceItems, id } = useInvoiceDraftStore()
    const deleteInvoiceItem = useDeleteInvoiceItem()

    const handleRemove = async (item: NewInvoiceItem) => {
        if (id) {
            try {
                deleteInvoiceItem.mutateAsync({
                    id: item.id,
                    invoiceId: id
                })
            } catch (err) {
                Alert.alert('Could not delete item', (err as Error).message)
                return
            }
        }

        setInvoiceItems(invoiceItems.filter(i => i.id !== item.id))
    }

    return (
        <View className="flex-1 gap-2 pb-1">
            <TextField text="Items" type="secondary" />

            {invoiceItems.map((item, index) => (
                <ItemCard
                    key={item.id}
                    item={item}
                    onChange={(updated) => {
                        setInvoiceItems(invoiceItems.map(i => i.id === updated.id ? updated : i))
                    }
                    }
                    onRemove={() => handleRemove(item)}
                    autoFocus={!hasItems && index === invoiceItems.length - 1 && invoiceItems.length >= 1}
                />
            ))}

            <TouchableOpacity onPress={addItem}>
                <TextField text="+ Add item" type="highlighted" className="my-1" />
            </TouchableOpacity>

            <TotalPriceCard />
        </View>
    )
}