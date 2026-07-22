import { InvoiceListRow } from "@/lib/definitons";
import { formatCurrency } from "@/lib/utils";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import Avatar from "../settingsScreen/Avatar";
import Status from "./Status";
import TextField from "./TextField";
type Props = {
    invoiceListRow: InvoiceListRow;
    isClientInvoice?: boolean;
}

export default function InvoiceOverview({ invoiceListRow, isClientInvoice }: Props) {
    return (
        <Link href={{
            pathname: '/invoice/[invoiceId]',
            params: { invoiceNumber: invoiceListRow.invoice_number, invoiceId: invoiceListRow.id }
        }} asChild>
            <TouchableOpacity className="flex-row justify-between">
                <View className="flex-row gap-2 items-center">
                    {
                        !isClientInvoice &&
                        <Avatar
                            size='xs'
                            firstName={invoiceListRow.client_first_name}
                            lastName={invoiceListRow.client_last_name}
                            url={invoiceListRow.client_image_url}
                            isInvAvatar
                        />
                    }

                    <View>
                        <TextField
                            text={isClientInvoice ? `#${invoiceListRow.invoice_number}` : `${invoiceListRow.client_first_name} ${invoiceListRow.client_last_name}`}
                            className="font-bold text-lg"
                        />

                        <TextField
                            text={`${!isClientInvoice ? `${invoiceListRow.invoice_number} · ` : ''}Due ${invoiceListRow.due_date}`}
                            type="secondary"
                        />
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