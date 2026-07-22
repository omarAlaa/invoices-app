export type Client = {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    email: string | null;
    phone: string | null;
    image_url: string;
    is_archived: boolean;
    created_at: string;
    updated_at: string;
}

export type NewClient = {
    first_name: string;
    last_name?: string;
    email?: string;
    phone?: string;
    image_url?: string;
}

export type UpdateClient = Partial<NewClient> & { id: string }

export type ClientStats = {
    client_id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    image_url: string;
    invoice_count: number;
    total_invoiced: number;
    total_paid: number;
    total_owed: number;
}

export interface ClientsSection {
    title: string;
    data: ClientStats[];
}

export type InvoiceStatus = 'all' | 'pending' | 'paid' | 'overdue'

export type Invoice = {
    id: string;
    user_id: string;
    client_id: string;
    invoice_number: string;
    status: InvoiceStatus;
    issue_date: string;
    due_date: string;
    subtotal: number;
    tax_rate: number;
    tax_amount: number;
    discount_amount: number;
    total: number;
    sent_at: string | null;
    paid_at: string | null;
    created_at: string;
    updated_at: string;
}

export type InvoiceListRow = Invoice & {
    client_first_name: string;
    client_last_name: string;
    client_email: string;
    client_image_url: string;
}

export type InvoiceItem = {
    id: string;
    invoice_id: string;
    title: string;
    quantity: number;
    rate: number;
    amount: number;
    position: number;
}

export type NewInvoiceItem = {
    id: string;
    title: string;
    quantity: string;
    rate: string;
}

export type InvoiceFilter = 'all' | 'paid' | 'pending' | 'overdue'

export type NewInvoicePayload = {
    clientId: string;
    issueDate: Date;
    dueDate: Date;
    taxRate: number;
    discountAmount: number;
    items: NewInvoiceItem[];
    status: string;
}