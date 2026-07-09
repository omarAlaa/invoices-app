import { ClientPickerSheetRef } from "@/components/createEditinvoiceScreen/ClientPickerSheet";
import ClientsList from "@/components/createEditinvoiceScreen/ClientsList";
import CreateEditInvoiceActions from "@/components/createEditinvoiceScreen/CreateEditInvoiceActions";
import DateFieldsSection from "@/components/createEditinvoiceScreen/DateFieldsSection";
import InvoiceItemsSection from "@/components/createEditinvoiceScreen/InvoiceItemsSection";
import InvoiceStatusSelector from "@/components/createEditinvoiceScreen/InvoiceStatusSelector";
import SelectClientField from "@/components/createEditinvoiceScreen/SelectClientField";
import TextField from "@/components/shared/TextField";
import { Client } from "@/features/clients/api";
import { Stack, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function CreateEditInvoice() {
    const [selectedClient, setSelectedClient] = useState<Client | null>(null)
    const clientPickerRef = useRef<ClientPickerSheetRef>(null)
    const { type } = useLocalSearchParams()

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView style={{ flex: 1 }} bottomOffset={40}>
                <View className="flex-1 pt-4 pb-16 px-8 gap-6">
                    <Stack.Screen
                        options={{
                            title: `${type} invoice`,
                            headerBackButtonDisplayMode: 'minimal',
                            headerShadowVisible: false,
                            headerRight: () => (
                                <TouchableOpacity>
                                    <TextField text="Save" type="highlighted" />
                                </TouchableOpacity>
                            )
                        }}
                    />

                    <SelectClientField
                        selectedClient={selectedClient}
                        onPress={() => clientPickerRef.current?.open()}
                    />

                    <DateFieldsSection />

                    <InvoiceItemsSection />

                    <InvoiceStatusSelector />

                    <CreateEditInvoiceActions />
                </View>
            </KeyboardAwareScrollView>

            <ClientsList
                ref={clientPickerRef}
                selectedId={selectedClient?.id ?? null}
                onSelect={setSelectedClient}
            />
        </View>
    )
}