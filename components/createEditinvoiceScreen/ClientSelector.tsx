import { useInvoiceDraftStore } from '@/store/useInvoiceDraftStore';
import { ChevronDown } from 'lucide-react-native';
import { TouchableOpacity, useColorScheme, View } from 'react-native';
import Avatar from '../settingsScreen/Avatar';
import TextField from '../shared/TextField';

type Props = {
    onPress: () => void;
};

export function ClientSelector({ onPress }: Props) {
    const systemColorScheme = useColorScheme()
    const { clientName, clientImageUrl } = useInvoiceDraftStore()

    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row justify-between items-center p-3 rounded-xl dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800"
        >
            {clientName ?
                <View className="flex-row items-center gap-2">
                    <Avatar
                        size='xs'
                        firstName={clientName.split(' ')[0]}
                        lastName={clientName.split(' ')[1]}
                        url={clientImageUrl}
                        isInvAvatar
                    />

                    <TextField text={clientName} className='font-bold text-lg' />
                </View>
                :
                <TextField text='Select a client' />
            }
            <ChevronDown color={systemColorScheme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
    )
}