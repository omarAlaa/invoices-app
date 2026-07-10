import { Client, InvoiceStatus, NewInvoiceItem } from '@/lib/definitons';
import { create } from 'zustand';

interface InvoiceDraftState {
    selectedClient: Client | null;
    issueDate: Date;
    dueDate: Date;
    invoiceItems: NewInvoiceItem[];
    taxRate: number;
    discountAmount: number;
    invoiceStatus: InvoiceStatus;

    setSelectedClient: (selectedClient: Client) => void;
    setIssueDate: (issueDate: Date) => void;
    setDueDate: (dueDate: Date) => void;
    setStatus: (status: InvoiceStatus) => void;
    addItem: () => void;
    setInvoiceItems: (items: NewInvoiceItem[]) => void;
    setTaxRate: (taxRate: number) => void;
    reset: () => void;
}

export const useInvoiceDraftStore = create<InvoiceDraftState>((set) => ({
    selectedClient: null,
    issueDate: new Date(),
    dueDate: new Date(Date.now() + 12096e5),
    invoiceItems: [],
    taxRate: 0,
    discountAmount: 0,
    invoiceStatus: 'pending',

    setSelectedClient: (selectedClient: Client) => set({ selectedClient }),
    setIssueDate: (issueDate: Date) => set({ issueDate }),
    setDueDate: (dueDate: Date) => set({ dueDate }),
    setStatus: (status: InvoiceStatus) => set({ invoiceStatus: status }),
    addItem: () =>
        set((state) => ({
            invoiceItems: [
                ...state.invoiceItems,
                { id: Date.now(), title: '', quantity: '', rate: '' },
            ],
        })),
    setInvoiceItems: (items: NewInvoiceItem[]) => set({ invoiceItems: items }),
    setTaxRate: (taxRate: number) => set({ taxRate }),
    reset: () => set({
        selectedClient: null,
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 12096e5),
        invoiceItems: [],
        taxRate: 0,
        invoiceStatus: 'pending'
    })
}))

export function selectDraftTotals(state: InvoiceDraftState) {
    const subtotal = state.invoiceItems.reduce((sum, item) => sum + Number(item.quantity) * Number(item.rate), 0)
    const taxAmount = Math.round(subtotal * (state.taxRate / 100) * 100) / 100
    const total = Math.max(subtotal + taxAmount - state.discountAmount, 0)
    return { subtotal, taxAmount, total }
}