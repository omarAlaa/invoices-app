import { create } from 'zustand';

interface ClientDraftStore {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    avatarURL: string;
    avatarUri: string;

    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setEmail: (email: string) => void;
    setPhone: (phone: string) => void;
    setAvatarURL: (avatarURL: string) => void;
    setAvatarUri: (avatarUri: string) => void;
    setClient: (id: string, firstName: string, lastName: string, email: string, phone: string, avatarURL: string) => void;
    reset: () => void;
}

export const useClientDraftStore = create<ClientDraftStore>((set) => ({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatarURL: '',
    avatarUri: '',

    setFirstName: (firstName) => set({ firstName }),
    setLastName: (lastName) => set({ lastName }),
    setEmail: (email) => set({ email }),
    setPhone: (phone) => set({ phone }),
    setAvatarURL: (avatarURL) => set({ avatarURL }),
    setAvatarUri: (avatarUri) => set({ avatarUri }),
    setClient: (id, firstName, lastName, email, phone, avatarURL) => set({ id, firstName, lastName, email, phone, avatarURL }),
    reset: () => set({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        avatarUri: '',
        avatarURL: '',
    })
}))