import { ClientSelector } from '@/components/createEditinvoiceScreen/ClientSelector'
import { useInvoiceDraftStore } from '@/store/useInvoiceDraftStore'
import { View } from 'react-native'
import TextField from '../shared/TextField'

type Props = {
    onPress: () => void;
}

export default function SelectClientField({ onPress }: Props) {
    const { selectedClient } = useInvoiceDraftStore()

    return (
        <View className='gap-2'>
            <TextField text="Bill to" type="secondary" />

            <ClientSelector
                name={selectedClient ? `${selectedClient.first_name} ${selectedClient.last_name}` : null}
                onPress={onPress}
            />
        </View>
    );
}