import { ClientSelector } from '@/components/createEditinvoiceScreen/ClientSelector';
import { View } from 'react-native';
import TextField from '../shared/TextField';

type Client = { id: string; name: string };

type Props = {
    selectedClient: Client | null;
    onPress: () => void
}

export default function SelectClientField({ selectedClient, onPress }: Props) {
    return (
        <View className='gap-2'>
            <TextField text="Bill to" type="secondary" />

            <ClientSelector
                name={selectedClient?.name || ''}
                onPress={onPress}
            />
        </View>
    );
}