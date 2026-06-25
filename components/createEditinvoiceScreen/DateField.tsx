import { CalendarDays } from 'lucide-react-native';
import { useState } from 'react';
import { TouchableOpacity, View, useColorScheme } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TextField from '../shared/TextField';

type Props = {
    label: string;
    value: Date;
    otherValue: Date;
    setDate: (date: Date) => void;
};

export function DateField({ label, value, otherValue, setDate }: Props) {
    const systemColorScheme = useColorScheme()
    const [show, setShow] = useState(false)

    const formatDate = (date: Date) => {
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    return (
        <View className='flex-1 gap-2'>
            <TextField text={`${label} date`} type='secondary' />

            <TouchableOpacity
                onPress={() => setShow(true)}
                className="relative flex-row justify-between items-center p-3 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-200 dark:bg-zinc-800">

                <TextField text={formatDate(value)} className='text-lg' />

                <CalendarDays
                    color={systemColorScheme === 'dark' ? 'white' : 'black'}
                    size={20}
                />
            </TouchableOpacity>

            <DateTimePickerModal
                date={value}
                isVisible={show}
                mode="date"
                display='inline'
                minimumDate={label === 'Due' ? otherValue : new Date(0)}
                maximumDate={label === 'Issue' ? otherValue : new Date(8640000000000000)}
                pickerComponentStyleIOS={{ alignSelf: 'center' }}
                onConfirm={(date) => {
                    setDate(date)
                    setShow(false)
                }}
                onCancel={() => setShow(false)}
            />
        </View>
    )
}