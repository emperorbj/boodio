import { AudioPlayer } from "expo-audio";
// separated most of the typescript types for clean code
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

export type ProgressProps = {
    currentTime : number;
    duration : number;
    onSeek: (seconds:number)=> void
}

export type FloatPlayerProps = {
    book: Book;
}

export type BookListProps = {
    book: Book;
}



export type PlayerStore =  {
  currentBook: Book | null;
  player: AudioPlayer | null;
  setCurrentBook: (book: Book) => void;
  setPlayer: (player: AudioPlayer) => void;
  resetPlayer: () => void;
}

export type PlayerTypeProps = {
    player:AudioPlayer;
    book:any;
    setBook:(book:any) => void
}

export type LogOutModalProps = {
    visible: boolean;
    onClose: () => void;
    onLogout: () => void;
    userName?: string;
}
