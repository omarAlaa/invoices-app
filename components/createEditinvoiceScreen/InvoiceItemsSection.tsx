import { TouchableOpacity, View } from "react-native";
import TextField from "../shared/TextField";
import ItemCard from "./ItemCard";
import TotalPriceCard from "./TotalPriceCard";

export default function InvoiceItemsSection() {
    return (
        <View className="flex-1 gap-2 pb-1">
            <TextField text="Items" type="secondary" />

            <ItemCard />

            <ItemCard />

            <TouchableOpacity>
                <TextField text="+ Add item" type="highlighted" className="my-1" />
            </TouchableOpacity>

            <TotalPriceCard />
        </View>
    )
}