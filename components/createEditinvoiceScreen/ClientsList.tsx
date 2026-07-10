import { useClients } from '@/features/clients/api'
import { Client } from "@/lib/definitons"
import { useInvoiceDraftStore } from '@/store/useInvoiceDraftStore'
import { forwardRef } from 'react'
import { ClientPickerSheet, ClientPickerSheetRef } from './ClientPickerSheet'

type Props = {
    onSelect: (client: Client) => void;
}

const ClientsList = forwardRef<ClientPickerSheetRef>(
    ({ }, ref) => {
        const { selectedClient, setSelectedClient } = useInvoiceDraftStore()
        const { data: clients, isLoading, isError, refetch, isRefetching } = useClients()

        return (
            <ClientPickerSheet
                ref={ref}
                clients={clients}
                selectedId={selectedClient?.id}
                onSelect={setSelectedClient}
            />
        )
    }
)

ClientsList.displayName = 'ClientsList'
export default ClientsList