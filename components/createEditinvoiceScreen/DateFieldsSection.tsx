import { useInvoiceDraftStore } from '@/store/useInvoiceDraftStore';
import { View } from 'react-native';
import { DateField } from './DateField';

export default function DateFieldsSection() {
    const { issueDate, dueDate, setIssueDate, setDueDate } = useInvoiceDraftStore()

    return (
        <View className="flex-row gap-3">
            <DateField
                label="Issue"
                value={issueDate}
                otherValue={dueDate}
                setDate={setIssueDate}
            />

            <DateField
                label="Due"
                value={dueDate}
                otherValue={issueDate}
                setDate={setDueDate}
            />
        </View>
    )
}