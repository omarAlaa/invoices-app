import { Client } from '@/lib/definitons';
import { MOCK_CLIENTS } from '@/lib/placeholder-data';
import { forwardRef } from 'react';
import { ClientPickerSheet, ClientPickerSheetRef } from './ClientPickerSheet';

type Props = {
    selectedId: string | null;
    onSelect: (client: Client) => void;
}

const ClientsList = forwardRef<ClientPickerSheetRef, Props>(
    ({ selectedId, onSelect }, ref) => {
        return (
            <ClientPickerSheet
                ref={ref}
                clients={MOCK_CLIENTS}
                selectedId={selectedId}
                onSelect={onSelect}
            />
        )
    }
)

ClientsList.displayName = 'ClientsList'
export default ClientsList