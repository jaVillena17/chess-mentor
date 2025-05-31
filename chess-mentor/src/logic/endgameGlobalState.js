import { create } from "zustand"

export const endgameState = create((set) => ({
    endgameStatus : "KEEP PLAYING",
    checkPieces : {},

    setEndgameStatus : (newStatus) =>  set({endgameStatus : newStatus}),
    setCheckPieces : (newCheckPieces) => ({checkPieces : newCheckPieces})
}))


export const winnerState = create((set) => ({
    //winner : "YOU WON",
    winner : null,
    setWinner : (newWinner) => set({winner : newWinner})
    
}))