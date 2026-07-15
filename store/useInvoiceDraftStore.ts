import { InvoiceStatus, NewInvoiceItem } from '@/lib/definitons';
import { create } from 'zustand';

interface InvoiceDraftState {
    id: string,
    selectedClientId: string | null;
    clientName: string;
    issueDate: Date;
    dueDate: Date;
    invoiceItems: NewInvoiceItem[];
    taxRate: number;
    discountAmount: number;
    invoiceStatus: InvoiceStatus;

    setSelectedClientId: (selectedClient: string) => void;
    setClientName: (name: string) => void;
    setIssueDate: (issueDate: Date) => void;
    setDueDate: (dueDate: Date) => void;
    setStatus: (status: InvoiceStatus) => void;
    addItem: () => void;
    setInvoiceItems: (items: NewInvoiceItem[]) => void;
    setTaxRate: (taxRate: number) => void;
    setInvoice: (id: string, selectedClientId: string, issueDate: Date, dueDate: Date, items: NewInvoiceItem[], invoiceStatus: InvoiceStatus) => void;
    reset: () => void;
}

export const useInvoiceDraftStore = create<InvoiceDraftState>((set) => ({
    id: '',
    selectedClientId: null,
    clientName: '',
    issueDate: new Date(),
    dueDate: new Date(Date.now() + 12096e5),
    invoiceItems: [],
    taxRate: 0,
    discountAmount: 0,
    invoiceStatus: 'pending',

    setSelectedClientId: (selectedClientId: string) => set({ selectedClientId }),
    setClientName: (name: string) => set({ clientName: name }),
    setIssueDate: (issueDate: Date) => set({ issueDate }),
    setDueDate: (dueDate: Date) => set({ dueDate }),
    setStatus: (status: InvoiceStatus) => set({ invoiceStatus: status }),
    addItem: () =>
        set((state) => ({
            invoiceItems: [
                ...state.invoiceItems,
                { id: Date.now().toString(), title: '', quantity: '', rate: '' },
            ],
        })),
    setInvoiceItems: (items: NewInvoiceItem[]) => set({ invoiceItems: items }),
    setTaxRate: (taxRate: number) => set({ taxRate }),
    setInvoice: (id, selectedClientId, issueDate, dueDate, items, invoiceStatus) => set({ id, selectedClientId, issueDate, dueDate, invoiceItems: items, invoiceStatus }),
    reset: () => set({
        id: '',
        selectedClientId: null,
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