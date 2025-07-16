import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthState } from '../types/data';

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => {
        console.log('User set:', user);
        set({ user });

        if (user) {
            AsyncStorage.setItem('user', JSON.stringify(user));
        } else {
            AsyncStorage.removeItem('user');
        }
    },

    signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null });
        AsyncStorage.removeItem('user');
    },

    checkSession: async () => {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            console.error("Session Error:", error);
            return;
        }

        const user = session?.user
            ? {
                id: session.user.id,
                email: session.user.email || ''
            }
            : null;

        console.log("Session user:", user);

        set({ user });

        if (user) {
            AsyncStorage.setItem('user', JSON.stringify(user));
        } else {
            AsyncStorage.removeItem('user');
        }
    }


}))

