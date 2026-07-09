import { ClientSelector } from '@/components/createEditinvoiceScreen/ClientSelector'
import { Client } from "@/lib/definitons"
import { View } from 'react-native'
import TextField from '../shared/TextField'

type Props = {
    selectedClient: Client | null;
    onPress: () => void;
}

export default function SelectClientField({ selectedClient, onPress }: Props) {
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