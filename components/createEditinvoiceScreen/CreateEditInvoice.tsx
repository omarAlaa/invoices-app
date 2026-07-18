import { ClientPickerSheetRef } from "@/components/createEditinvoiceScreen/ClientPickerSheet";
import ClientsList from "@/components/createEditinvoiceScreen/ClientsList";
import CreateEditInvoiceActions from "@/components/createEditinvoiceScreen/CreateEditInvoiceActions";
import DateFieldsSection from "@/components/createEditinvoiceScreen/DateFieldsSection";
import InvoiceItemsSection from "@/components/createEditinvoiceScreen/InvoiceItemsSection";
import InvoiceStatusSelector from "@/components/createEditinvoiceScreen/InvoiceStatusSelector";
import SelectClientField from "@/components/createEditinvoiceScreen/SelectClientField";
import { useInvoiceDraftStore } from "@/store/useInvoiceDraftStore";
import { X } from "lucide-react-native";
import { useRef } from "react";
import { Alert, TouchableOpacity, useColorScheme, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import TextField from "../shared/TextField";

type Props = {
    type: string;
    onClose: () => void;
    hasItems?: boolean;
}

export default function CreateEditInvoice({ type, onClose, hasItems }: Props) {
    const clientPickerRef = useRef<ClientPickerSheetRef>(null)
    const isDark = useColorScheme() === 'dark'
    const { reset } = useInvoiceDraftStore()

    const handleClose = () => {
        Alert.alert(
            `Discard ${type === 'New' ? 'invoice' : 'changes'}`,
            `Are you sure you want to discard this ${type === 'New' ? 'new invoice' : 'changes'} ?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Discard",
                    style: "destructive",
                    onPress: () => {
                        reset()
                        onClose()
                    }
                }
            ]
        )
    }

    return (
        <KeyboardAwareScrollView className={`flex-1 ${isDark ? 'bg-black' : 'bg-[#f2f2f2]'}`} bottomOffset={40}>
            <View style={{ flex: 1 }} >
                <View className="flex-1 pt-4 pb-16 px-8 gap-6">
                    <View className="flex-row justify-center items-center">
                        <TouchableOpacity className="absolute left-0" onPress={handleClose}>
                            <X color={isDark ? 'white' : 'black'} />
                        </TouchableOpacity>

                        <TextField text={`${type} invoice`} className="font-semibold text-xl" />
                    </View>

                    <SelectClientField
                        onPress={() => clientPickerRef.current?.open()}
                    />

                    <DateFieldsSection />

                    <InvoiceItemsSection hasItems={hasItems || false} />

                    <InvoiceStatusSelector />

                    <CreateEditInvoiceActions type={type} dismiss={onClose} />
                </View>
            </View>

            <ClientsList
                ref={clientPickerRef}
            />
        </KeyboardAwareScrollView>
    )
}