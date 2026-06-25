import { forwardRef } from 'react';
import { ClientPickerSheet, ClientPickerSheetRef } from './ClientPickerSheet';

type Client = {
    id: string;
    name: string;
}

type Props = {
    selectedId: string | null;
    onSelect: (client: Client) => void;
}

const MOCK_CLIENTS: Client[] = [
    { id: '1', name: 'Nova Media' },
    { id: '2', name: 'Acme Corp' },
    { id: '3', name: 'Stark Industries' },
    { id: '4', name: 'Nova Media' },
    { id: '5', name: 'Acme Corp' },
    { id: '6', name: 'Stark Industries' },
    { id: '7', name: 'Nova Media' },
    { id: '8', name: 'Acme Corp' },
    { id: '9', name: 'Stark Industries' },
    { id: '10', name: 'Nova Media' },
    { id: '11', name: 'Acme Corp' },
    { id: '12', name: 'Stark Industries' },
    { id: '13', name: 'Nova Media' },
    { id: '14', name: 'Acme Corp' },
    { id: '15', name: 'Stark Industries' },
]

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