import { View } from "react-native";
import TextField from "../shared/TextField";
import InvoiceItem from "./InvoiceItem";

export default function InvoiceItemsSection() {
    return (
        <View>
            <TextField text="Items" className="font-bold text-xl mb-3" />

            <InvoiceItem />

            <View className="my-4 border-b border-gray-400" />

            <InvoiceItem />

            <View className="my-4 border-b border-gray-400" />

            <InvoiceItem />

            <View className="my-4 border-b border-gray-400" />

            <InvoiceItem />

            <View className="my-4 border-b border-gray-400" />

            <InvoiceItem />

            <View className="my-4 border-b border-gray-400" />
        </View>
    )
}