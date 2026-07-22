import { create } from 'zustand';

interface AuthState {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarURL: string;
    avatarUri: string;
    isInitialized: boolean;
    setAuth: (userId: string, email: string) => void;
    setInfo: (firstName: string, lastName: string, avatarURL: string) => void;
    setName: (firstName: string, lastName: string) => void;
    setAvatarURL: (avatarURL: string) => void;
    setAvatarUri: (avatarURL: string) => void;
    clearAuthInfo: () => void;
    setIsInitialized: (isInitialized: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    avatarURL: '',
    avatarUri: '',
    isInitialized: false,

    setAuth: (userId, email) => set({ userId, email }),

    setInfo: (firstName, lastName, avatarURL) => { set({ firstName, lastName, avatarURL }) },

    setName: (firstName, lastName) => { set({ firstName, lastName }) },

    setAvatarURL: (avatarURL) => { set({ avatarURL }) },

    setAvatarUri: (avatarUri) => { set({ avatarUri }) },

    clearAuthInfo: () => set({ userId: '', email: '', firstName: '', lastName: '', avatarURL: '', avatarUri: '' }),

    setIsInitialized: (isInitialized) => set({ isInitialized }),
}));