import { Client, ClientsSection } from "./definitons";

export const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(amount);
}

export function groupByLetter(clients: Client[]): ClientsSection[] {
    const sorted = [...clients].sort((a, b) => a.name.localeCompare(b.name));
    const map = new Map<string, Client[]>();
    for (const client of sorted) {
        const letter = client.name[0].toUpperCase();
        if (!map.has(letter)) map.set(letter, []);
        map.get(letter)!.push(client);
    }
    return Array.from(map.entries()).map(([title, data]) => ({ title, data }));
}