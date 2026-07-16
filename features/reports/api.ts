// features/reports/api.ts
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

export type DateRange = 'this_month' | 'last_month' | 'this_quarter' | 'this_year'

export type ReportsSummary = {
    revenue: number;
    outstanding: number;
    invoicesSent: number;
    averageValue: number;
    statusBreakdown: { paid: number; pending: number; overdue: number };
    topClients: { clientId: string; name: string; total: number }[];
}

export const reportsKeys = {
    all: ['reports'] as const,
    summary: (range: DateRange) => [...reportsKeys.all, 'summary', range] as const,
}

function rangeToDates(range: DateRange): { start: string; end: string } {
    const now = new Date()
    const start = new Date()
    const end = new Date()

    if (range === 'this_month') {
        start.setDate(1)
    } else if (range === 'last_month') {
        start.setMonth(now.getMonth() - 1, 1)
        end.setDate(0)
    } else if (range === 'this_quarter') {
        start.setMonth(Math.floor(now.getMonth() / 3) * 3, 1)
    } else {
        start.setMonth(0, 1)
    }

    return { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) }
}

export function useReportsSummary(range: DateRange) {
    return useQuery({
        queryKey: reportsKeys.summary(range),
        queryFn: async (): Promise<ReportsSummary> => {
            const { start, end } = rangeToDates(range)

            const { data, error } = await supabase
                .from('invoice_list_view')
                .select('*')
                .gte('issue_date', start)
                .lte('issue_date', end)

            if (error) throw error

            const summary: ReportsSummary = {
                revenue: 0,
                outstanding: 0,
                invoicesSent: data.length,
                averageValue: 0,
                statusBreakdown: { paid: 0, pending: 0, overdue: 0 },
                topClients: [],
            }

            const byClient = new Map<string, { name: string; total: number }>()

            for (const inv of data) {
                if (inv.status === 'paid') {
                    summary.revenue += inv.total
                    summary.statusBreakdown.paid += 1
                } else if (inv.status === 'overdue') {
                    summary.outstanding += inv.total
                    summary.statusBreakdown.overdue += 1
                } else if (inv.status === 'pending') {
                    summary.outstanding += inv.total
                    summary.statusBreakdown.pending += 1
                }

                const name = `${inv.client_first_name} ${inv.client_last_name}`
                const existing = byClient.get(inv.client_id)
                byClient.set(inv.client_id, { name, total: (existing?.total ?? 0) + inv.total })
            }

            summary.averageValue = data.length > 0 ? summary.revenue / data.length : 0

            summary.topClients = Array.from(byClient.entries())
                .map(([clientId, v]) => ({ clientId, ...v }))
                .sort((a, b) => b.total - a.total)
                .slice(0, 3)

            return summary
        },
    })
}