import { ClientStats } from "@/lib/definitons";
import { ClientsSection } from "./definitons";

export const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

export function formatCurrency(amount: number | undefined): string {
    if (amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EGP',
            maximumFractionDigits: 0,
        }).format(amount);
    }

    return '0'
}

export function groupByLetter(clients: ClientStats[] | undefined): ClientsSection[] {
    if (clients) {
        const sorted = [...clients].sort((a, b) => a.first_name.localeCompare(b.first_name));
        const map = new Map<string, ClientStats[]>();
        for (const client of sorted) {
            const letter = client.first_name[0].toUpperCase();
            if (!map.has(letter)) map.set(letter, []);
            map.get(letter)!.push(client);
        }
        return Array.from(map.entries()).map(([title, data]) => ({ title, data }));
    }

    return []
}