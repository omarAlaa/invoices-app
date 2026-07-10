import { InvoiceStatus } from "@/lib/definitons";
import { useInvoiceDraftStore } from "@/store/useInvoiceDraftStore";
import { Check, Clock, ClockAlert } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
    status: InvoiceStatus,
}

export default function invoiceStatusRadioButton({ status }: Props) {
    const { invoiceStatus, setStatus } = useInvoiceDraftStore()

    return (
        <TouchableOpacity className="flex-row gap-2 items-center" onPress={() => setStatus(status)}>
            <View className={`items-center justify-center w-6 h-6 rounded-full ${invoiceStatus === status ? 'bg-gray-600' : 'bg-gray-300'}`}>
                <View className={`w-2 h-2 rounded-full ${invoiceStatus === status ? 'bg-white' : 'bg-gray-300'}`} />
            </View>

            <View className={`flex-row items-center gap-2 px-4 py-2 rounded-full ${status === 'paid' ? 'bg-green-600' : status === 'overdue' ? 'bg-red-700' : 'bg-yellow-600'}`}>
                <Text className="text-white">{status}</Text>

                {status === 'pending' ?
                    <Clock size={18} color='white' />
                    :
                    status === 'paid' ?
                        <Check size={18} color='white' />
                        :
                        <ClockAlert size={18} color='white' />
                }
            </View>
        </TouchableOpacity>
    )
}