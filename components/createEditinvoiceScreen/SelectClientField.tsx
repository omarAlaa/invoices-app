import { ClientSelector } from '@/components/createEditinvoiceScreen/ClientSelector'
import { useInvoiceDraftStore } from '@/store/useInvoiceDraftStore'
import { View } from 'react-native'
import TextField from '../shared/TextField'

type Props = {
    onPress: () => void;
}

export default function SelectClientField({ onPress }: Props) {
    const { clientName } = useInvoiceDraftStore()

    return (
        <View className='gap-2'>
            <TextField text="Bill to" type="secondary" />

            <ClientSelector
                name={clientName}
                onPress={onPress}
            />
        </View>
    );
}