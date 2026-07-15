import { clientKeys } from '@/features/clients/api';
import { Invoice, InvoiceFilter, InvoiceItem, InvoiceListRow, InvoiceStatus, NewInvoicePayload } from '@/lib/definitons';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const invoiceKeys = {
    all: ['invoices'] as const,
    lists: () => [...invoiceKeys.all, 'list'] as const,
    list: (filter: InvoiceFilter) => [...invoiceKeys.lists(), filter] as const,
    detail: (id: string) => [...invoiceKeys.all, 'detail', id] as const,
    items: (id: string) => [...invoiceKeys.all, 'items', id] as const,
    payments: (id: string) => [...invoiceKeys.all, 'payments', id] as const,
    byClient: (clientId: string) => [...invoiceKeys.all, 'byClient', clientId] as const,
};

const filterToStatuses: Record<InvoiceFilter, InvoiceStatus[] | null> = {
    all: null,
    paid: ['paid'],
    pending: ['pending'],
    overdue: ['overdue'],
}

export function useInvoices(filter: InvoiceFilter = 'all') {
    return useQuery({
        queryKey: invoiceKeys.list(filter),
        queryFn: async (): Promise<InvoiceListRow[]> => {
            let query = supabase
                .from('invoice_list_view')
                .select('*')
                .order('due_date', { ascending: true })

            const statuses = filterToStatuses[filter]
            if (statuses) query = query.in('status', statuses);

            const { data, error } = await query
            if (error) throw error
            return data
        },
    })
}

export function useRecentInvoices(limit = 4) {
    return useQuery({
        queryKey: invoiceKeys.lists(),
        queryFn: async (): Promise<InvoiceListRow[]> => {
            const { data, error } = await supabase
                .from('invoice_list_view')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(limit)

            if (error) throw error

            return data
        },
    })
}

export function useInvoice(id: string | undefined) {
    return useQuery({
        queryKey: invoiceKeys.detail(id ?? ''),
        queryFn: async (): Promise<InvoiceListRow> => {
            const { data, error } = await supabase.from('invoice_list_view').select('*').eq('id', id).single()

            if (error) throw error

            return data
        },
        enabled: !!id,
    })
}

export function useInvoiceItems(invoiceId: string | undefined) {
    return useQuery({
        queryKey: invoiceKeys.items(invoiceId ?? ''),
        queryFn: async (): Promise<InvoiceItem[]> => {
            const { data, error } = await supabase
                .from('invoice_items')
                .select('*')
                .eq('invoice_id', invoiceId)
                .order('position', { ascending: true })

            if (error) throw error

            return data
        },
        enabled: !!invoiceId,
    })
}

export function useClientInvoices(clientId: string | undefined) {
    return useQuery({
        queryKey: invoiceKeys.byClient(clientId ?? ''),
        queryFn: async (): Promise<InvoiceListRow[]> => {
            const { data, error } = await supabase
                .from('invoice_list_view')
                .select('*')
                .eq('client_id', clientId)
                .order('issue_date', { ascending: false })

            if (error) throw error

            return data
        },
        enabled: !!clientId,
    })
}

export function useCreateInvoice() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: NewInvoicePayload): Promise<Invoice> => {

            const { data: invoice, error: invoiceError } = await supabase
                .from('invoices')
                .insert({
                    user_id: useAuthStore.getState().userId,
                    client_id: payload.clientId,
                    issue_date: payload.issueDate,
                    due_date: payload.dueDate,
                    tax_rate: payload.taxRate,
                    discount_amount: payload.discountAmount,
                    status: payload.status,
                })
                .select()
                .single()

            if (invoiceError) throw invoiceError;

            if (payload.items.length > 0) {
                const { error: itemsError } = await supabase.from('invoice_items').insert(
                    payload.items.map((item, index) => ({
                        invoice_id: invoice.id,
                        title: item.title,
                        quantity: item.quantity,
                        rate: item.rate,
                        position: index,
                    }))
                )

                if (itemsError) {
                    await supabase.from('invoices').delete().eq('id', invoice.id)
                    throw itemsError
                }
            }

            return invoice
        },
        onSuccess: (invoice) => {
            queryClient.invalidateQueries({ queryKey: invoiceKeys.lists() })
            queryClient.invalidateQueries({ queryKey: invoiceKeys.byClient(invoice.client_id) })
            queryClient.invalidateQueries({ queryKey: clientKeys.stats(invoice.client_id) })
        },
    })
}

export function useUpdateInvoiceStatus() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: InvoiceStatus }): Promise<Invoice> => {
            const { data, error } = await supabase
                .from('invoices')
                .update({ status })
                .eq('id', id)
                .select()
                .single()

            if (error) throw error

            return data
        },
        onSuccess: (invoice) => {
            queryClient.invalidateQueries({ queryKey: invoiceKeys.detail(invoice.id) })
            queryClient.invalidateQueries({ queryKey: invoiceKeys.lists() })
            queryClient.invalidateQueries({ queryKey: clientKeys.stats(invoice.client_id) })
        },
    })
}

export function useDeleteInvoice() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string): Promise<void> => {
            const { error } = await supabase.from('invoices').delete().eq('id', id)

            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: invoiceKeys.lists() })
        },
    })
}

export type UpdateInvoicePayload = {
    id: string;
    clientId?: string;
    issueDate?: Date;
    dueDate?: Date;
    taxRate?: number;
    status?: InvoiceStatus;
}

export function useUpdateInvoice() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, clientId, issueDate, dueDate, taxRate, status }: UpdateInvoicePayload): Promise<Invoice> => {
            const { data, error } = await supabase
                .from('invoices')
                .update({
                    client_id: clientId,
                    issue_date: issueDate,
                    due_date: dueDate,
                    tax_rate: taxRate,
                    status,
                })
                .eq('id', id)
                .select()
                .single()

            if (error) throw error

            return data
        },
        onSuccess: (invoice) => {
            queryClient.invalidateQueries({ queryKey: invoiceKeys.detail(invoice.id) });
            queryClient.invalidateQueries({ queryKey: invoiceKeys.lists() });
            queryClient.invalidateQueries({ queryKey: clientKeys.stats(invoice.client_id) });
        },
    })
}

export function useAddInvoiceItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (input: {
            invoiceId: string;
            description: string;
            quantity: number;
            unitPrice: number;
            position: number;
        }): Promise<InvoiceItem> => {
            const { data, error } = await supabase
                .from('invoice_items')
                .insert({
                    invoice_id: input.invoiceId,
                    description: input.description,
                    quantity: input.quantity,
                    unit_price: input.unitPrice,
                    position: input.position,
                })
                .select()
                .single()

            if (error) throw error

            return data
        },

        onSuccess: (item) => {
            queryClient.invalidateQueries({ queryKey: invoiceKeys.items(item.invoice_id) });
            queryClient.invalidateQueries({ queryKey: invoiceKeys.detail(item.invoice_id) });
            queryClient.invalidateQueries({ queryKey: invoiceKeys.lists() });
        },
    })
}

export function useUpdateInvoiceItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (input: {
            id: string;
            invoiceId: string;
            title?: string;
            quantity?: number;
            rate?: number;
        }): Promise<InvoiceItem> => {
            const { data, error } = await supabase
                .from('invoice_items')
                .update({
                    title: input.title,
                    quantity: input.quantity,
                    rate: input.rate,
                })
                .eq('id', input.id)
                .select()
                .single()
            if (error) throw error

            return data
        },
        onSuccess: (_item, input) => {
            queryClient.invalidateQueries({ queryKey: invoiceKeys.items(input.invoiceId) })
            queryClient.invalidateQueries({ queryKey: invoiceKeys.detail(input.invoiceId) })
            queryClient.invalidateQueries({ queryKey: invoiceKeys.lists() })
        },
    })
}

export function useDeleteInvoiceItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id }: { id: string; invoiceId: string }): Promise<void> => {
            const { error } = await supabase.from('invoice_items').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: (_data, input) => {
            queryClient.invalidateQueries({ queryKey: invoiceKeys.items(input.invoiceId) });
            queryClient.invalidateQueries({ queryKey: invoiceKeys.detail(input.invoiceId) });
            queryClient.invalidateQueries({ queryKey: invoiceKeys.lists() });
        },
    });
}