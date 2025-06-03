// src/middleware/authStore.js
import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = create((set) => ({
    user: null,
    accessToken: null,

    setTokens: ({ accessToken }) => {
        let user = null;
        try {
            user = jwtDecode(accessToken);
        } catch (err) {
            console.error('Invalid token');
        }
        set({ accessToken, user });
    },

    setUser: (user) => set({ user }),

    logout: () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshToken');
        set({ user: null, accessToken: null });
    },
}));
