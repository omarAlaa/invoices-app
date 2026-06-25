import { useState } from 'react';
import { View } from 'react-native';
import { DateField } from './DateField';

export default function DateFieldsSection() {
    const [issueDate, setIssueDate] = useState<Date>(new Date());
    const [dueDate, setDueDate] = useState<Date>(new Date(Date.now() + 12096e5));

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