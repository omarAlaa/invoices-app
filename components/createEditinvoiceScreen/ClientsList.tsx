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
        const { selectedClientId, setSelectedClientId, setClientName } = useInvoiceDraftStore()
        const { data: clients, isLoading, isError, refetch, isRefetching } = useClients()

        const handleSelect = (client: Client) => {
            setSelectedClientId(client.id)
            setClientName(`${client.first_name} ${client.last_name}`)
        }

        return (
            <ClientPickerSheet
                ref={ref}
                clients={clients}
                selectedId={selectedClientId || undefined}
                onSelect={handleSelect}
            />
        )
    }
)

ClientsList.displayName = 'ClientsList'
export default ClientsList