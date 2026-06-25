import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import TextField from "../shared/TextField";
import ItemCard from "./ItemCard";
import TotalPriceCard from "./TotalPriceCard";

type Item = { id: number };

export default function InvoiceItemsSection() {
    const [items, setItems] = useState<Item[]>([])

    const addItem = () => {
        setItems(prev => [...prev, { id: Date.now() }])
    }

    const removeItem = (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    return (
        <View className="flex-1 gap-2 pb-1">
            <TextField text="Items" type="secondary" />

            {items.map((item, index) => (
                <ItemCard
                    key={item.id}
                    autoFocus={index === items.length - 1 && items.length >= 1}
                    onRemove={() => removeItem(item.id)}
                />
            ))}

            <TouchableOpacity onPress={addItem}>
                <TextField text="+ Add item" type="highlighted" className="my-1" />
            </TouchableOpacity>

            <TotalPriceCard />
        </View>
    )
}