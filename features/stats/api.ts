import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

export type DashboardSummary = {
    totalOutstanding: number;
    totalPaid: number;
    totalPending: number;
    totalOverdue: number;
}

export const dashboardKeys = {
    summary: () => ['dashboard', 'summary'] as const,
    recentInvoices: () => ['dashboard', 'recentInvoices'] as const,
}

export function useDashboardSummary() {
    return useQuery({
        queryKey: dashboardKeys.summary(),
        queryFn: async (): Promise<DashboardSummary> => {
            const { data, error } = await supabase
                .from('invoices')
                .select('status, total')

            if (error) throw error

            return data.reduce(
                (acc, inv) => {
                    if (inv.status === 'paid') acc.totalPaid += inv.total
                    else if (inv.status === 'pending') acc.totalPending += inv.total
                    else acc.totalOverdue += inv.total
                    acc.totalOutstanding += inv.total
                    return acc
                },
                { totalOutstanding: 0, totalPaid: 0, totalPending: 0, totalOverdue: 0 }
            )
        },
    })
}