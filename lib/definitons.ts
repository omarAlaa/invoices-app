import { Client } from "@/features/clients/api";

export interface ClientsSection {
    title: string;
    data: Client[];
}