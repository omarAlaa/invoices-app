import { useInvoiceDraftStore } from "@/store/useInvoiceDraftStore";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import TextField from "../shared/TextField";
import ItemCard from "./ItemCard";
import TotalPriceCard from "./TotalPriceCard";

export default function InvoiceItemsSection() {
    const { invoiceItems, addItem, setInvoiceItems } = useInvoiceDraftStore()
    const [autoFocus, setAutoFocus] = useState(false)

    const handleAddItem = () => {
        addItem()
        if (!autoFocus) {
            setAutoFocus(true)
        }
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
                    }}
                    onRemove={() => setInvoiceItems(invoiceItems.filter(i => i.id !== item.id))}
                    autoFocus={index === invoiceItems.length - 1 && autoFocus}
                />
            ))}

            <TouchableOpacity onPress={handleAddItem}>
                <TextField text="+ Add item" type="highlighted" className="my-1" />
            </TouchableOpacity>

            <TotalPriceCard />
        </View>
    )
}