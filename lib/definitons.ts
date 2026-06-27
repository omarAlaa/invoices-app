export type Client = {
    id: string;
    name: string;
    invoice_count: number;
    total_billed: number;
}

export interface ClientsSection {
    title: string;
    data: Client[];
}