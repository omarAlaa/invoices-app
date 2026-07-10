import { InvoiceListRow } from "@/lib/definitons";
import { formatCurrency } from "@/lib/utils";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Status from "./Status";
import TextField from "./TextField";
type Props = {
    invoiceListRow: InvoiceListRow;
}

export default function InvoiceOverview({ invoiceListRow }: Props) {
    return (
        <Link href="/invoice/INV-0042" asChild>
            <TouchableOpacity className="flex-row justify-between">
                <View className="flex-row gap-2 items-center">
                    <View className="w-12 h-12 rounded-full bg-blue-200 justify-center items-center">
                        <Text className="font-bold text-xl text-blue-600">
                            {`${invoiceListRow.client_first_name[0]}${invoiceListRow.client_last_name && invoiceListRow.client_last_name[0]}`}
                        </Text>
                    </View>

                    <View>
                        <TextField text={`${invoiceListRow.client_first_name} ${invoiceListRow.client_last_name}`} className="font-bold text-lg" />

                        <TextField text={`${invoiceListRow.invoice_number} · Due ${invoiceListRow.due_date}`} type="secondary" />
                    </View>
                </View>

                <View className="justify-center items-end">
                    <TextField text={formatCurrency(invoiceListRow.total)} className="font-bold text-lg" />

                    <Status status={invoiceListRow.status} />
                </View>
            </TouchableOpacity>
        </Link>
    )
}