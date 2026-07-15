import { create } from 'zustand';

interface ClientDraftStore {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,

    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setEmail: (email: string) => void;
    setPhone: (phone: string) => void;
    setClient: (id: string, firstName: string, lastName: string, email: string, phone: string) => void;
    reset: () => void;
}

export const useClientDraftStore = create<ClientDraftStore>((set) => ({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

    setFirstName: (firstName) => set({ firstName }),
    setLastName: (lastName) => set({ lastName }),
    setEmail: (email) => set({ email }),
    setPhone: (phone) => set({ phone }),
    setClient: (id, firstName, lastName, email, phone) => set({ id, firstName, lastName, email, phone }),
    reset: () => set({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    })
}))