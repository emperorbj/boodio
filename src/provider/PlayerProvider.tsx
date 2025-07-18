import { AudioPlayer, useAudioPlayer } from "expo-audio";
import { createContext,PropsWithChildren, useContext, useState } from "react";
import dummyBooks from "../dummyBooks";

type PlayerTypeProps = {
    player:AudioPlayer;
    book:any;
    setBook:(book:any) => void
}

const PlayerContext = createContext<PlayerTypeProps|undefined>(undefined);

export default function PlayerProvider ({children}:PropsWithChildren ) {
    const [book,setBook] = useState<any | null>(null)
    
    const player = useAudioPlayer({uri:book?.audio_url})
    return (
        <PlayerContext.Provider value={{player,book,setBook}}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => useContext(PlayerContext)