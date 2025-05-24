import { create } from "zustand"

export const endgameState = create((set) => ({
    endgameStatus : "KEEP PLAYING",
    checkPieces : {},

    setEndgameStatus : (newStatus) =>  set({endgameStatus : newStatus}),
    setCheckPieces : (newCheckPieces) => ({checkPieces : newCheckPieces})
}))