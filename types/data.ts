export type Book = {
    id: string;
    title: string;
    author: string;
    audio_url?: string;
    thumbnail_url?: string;
}

export type User = {
    id: string;
    email: string;
}

export type AuthState = {
    user: User | null;
    setUser: (user: User | null) => void;
    signOut: () => Promise<void>;
    checkSession: () => Promise<void>;
}