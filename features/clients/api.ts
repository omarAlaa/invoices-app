import { Client, ClientStats, NewClient, UpdateClient } from '@/lib/definitons';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const clientKeys = {
    all: ['clients'] as const,
    lists: () => [...clientKeys.all, 'list'] as const,
    detail: (id: string) => [...clientKeys.all, 'detail', id] as const,
    stats: (id: string) => [...clientKeys.all, 'stats', id] as const,
}

export function useClients() {
    return useQuery({
        queryKey: clientKeys.lists(),
        queryFn: async (): Promise<Client[]> => {
            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .order('first_name', { ascending: true })

            if (error) throw error

            return data
        },
    })
}

export function useClient(id: string | undefined) {
    return useQuery({
        queryKey: clientKeys.detail(id ?? ''),
        queryFn: async (): Promise<Client> => {
            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error

            return data
        },
        enabled: !!id,
    })
}

export function useClientStats(clientId: string | undefined) {
    return useQuery({
        queryKey: clientKeys.stats(clientId ?? ''),
        queryFn: async (): Promise<ClientStats> => {
            const { data, error } = await supabase
                .from('client_stats')
                .select('*')
                .eq('client_id', clientId)
                .single()

            if (error) throw error

            return data
        },
        enabled: !!clientId,
    })
}

export function useClientsWithStats() {
    return useQuery({
        queryKey: [...clientKeys.lists(), 'withStats'] as const,
        queryFn: async (): Promise<ClientStats[]> => {
            const { data, error } = await supabase
                .from('client_stats')
                .select('*')
                .order('first_name', { ascending: true })

            if (error) throw error

            return data
        },
    });
}

export function useCreateClient() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (input: NewClient): Promise<boolean> => {
            const { success, error } = await supabase
                .from('clients')
                .insert({ ...input, user_id: useAuthStore.getState().userId })
                .select()
                .single()

            if (error) throw error

            return success
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: clientKeys.lists() })
        },
    })
}

export function useUpdateClient() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, ...changes }: UpdateClient): Promise<Client> => {
            const { data, error } = await supabase
                .from('clients')
                .update(changes)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error

            return data
        },
        onSuccess: (updated) => {
            queryClient.invalidateQueries({ queryKey: clientKeys.lists() })
            queryClient.invalidateQueries({ queryKey: clientKeys.detail(updated.id) })
        },
    })
}

export function useArchiveClient() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string): Promise<void> => {
            const { error } = await supabase.from('clients').update({ is_archived: true }).eq('id', id);
            if (error) throw error
        },
        onSuccess: (_data, id) => {
            queryClient.invalidateQueries({ queryKey: clientKeys.lists() })
            queryClient.invalidateQueries({ queryKey: clientKeys.detail(id) })
        },
    })
}