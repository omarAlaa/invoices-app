import { selectDraftTotals, useInvoiceDraftStore } from "@/store/useInvoiceDraftStore";
import { TouchableOpacity, View } from "react-native";
import { useShallow } from 'zustand/react/shallow';
import Card from "../shared/Card";
import TextField from "../shared/TextField";

export default function TotalPriceCard() {
    const { subtotal, total, taxAmount } = useInvoiceDraftStore(useShallow(selectDraftTotals))
    const { taxRate, setTaxRate } = useInvoiceDraftStore()

    return (
        <Card>
            <View className="flex-row justify-between items-center">
                <TextField text="Subtotal" type="secondary" />

                <TextField text={subtotal} className="text-lg" />
            </View>

            <View className="flex-row justify-between items-center mt-2">
                <TextField text="Tax" type="secondary" />

                <TouchableOpacity onPress={() => setTaxRate(taxRate === 0 ? 10 : 0)}>
                    {taxRate === 0 ?
                        <TextField text="Add tax" type="highlighted" />
                        :
                        <TextField text={`Remove tax ${taxAmount}`} type="highlighted" />
                    }
                </TouchableOpacity>
            </View>

            <View className="my-2 border-b border-gray-400" />

            <View className="flex-row justify-between items-center">
                <TextField text="Total" className="font-bold text-lg" />

                <TextField text={total} className="font-bold text-lg" />
            </View>
        </Card>
    )
}