import { Client, useClients } from '@/features/clients/api';
import { forwardRef } from 'react';
import { ClientPickerSheet, ClientPickerSheetRef } from './ClientPickerSheet';

type Props = {
    selectedId: string | null;
    onSelect: (client: Client) => void;
}

const ClientsList = forwardRef<ClientPickerSheetRef, Props>(
    ({ selectedId, onSelect }, ref) => {
        const { data: clients, isLoading, isError, refetch, isRefetching } = useClients()

        return (
            <ClientPickerSheet
                ref={ref}
                clients={clients}
                selectedId={selectedId}
                onSelect={onSelect}
            />
        )
    }
)

ClientsList.displayName = 'ClientsList'
export default ClientsList