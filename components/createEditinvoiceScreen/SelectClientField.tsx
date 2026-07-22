import { ClientSelector } from '@/components/createEditinvoiceScreen/ClientSelector'
import { View } from 'react-native'
import TextField from '../shared/TextField'

type Props = {
    onPress: () => void;
}

export default function SelectClientField({ onPress }: Props) {
    return (
        <View className='gap-2'>
            <TextField text="Bill to" type="secondary" />

            <ClientSelector onPress={onPress} />
        </View>
    );
}