import { create } from 'zustand';

interface AuthState {
    userId: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    avatarURL: string | null;
    avatarUri: string | null;
    isInitialized: boolean;
    setAuth: (userId: string | null, email: string | null) => void;
    setInfo: (firstName: string | null, lastName: string | null, avatarURL: string | null) => void;
    setName: (firstName: string | null, lastName: string | null) => void;
    setAvatarURL: (avatarURL: string | null) => void;
    setAvatarUri: (avatarURL: string | null) => void;
    clearAuthInfo: () => void;
    setIsInitialized: (isInitialized: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    userId: null,
    email: null,
    firstName: null,
    lastName: null,
    avatarURL: null,
    avatarUri: null,
    isInitialized: false,

    setAuth: (userId, email) => set({ userId, email }),

    setInfo: (firstName, lastName, avatarURL) => { set({ firstName, lastName, avatarURL }) },

    setName: (firstName, lastName) => { set({ firstName, lastName }) },

    setAvatarURL: (avatarURL) => { set({ avatarURL }) },

    setAvatarUri: (avatarUri) => { set({ avatarUri }) },

    clearAuthInfo: () => set({ userId: null, email: null, firstName: null, lastName: null, avatarURL: null, avatarUri: null }),

    setIsInitialized: (isInitialized) => set({ isInitialized }),
}));