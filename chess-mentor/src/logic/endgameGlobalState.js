import { create } from "zustand"

export const endgameState = create((set) => ({
    endgameStatus : "KEEP PLAYING",

    setEndgameStatus : (newStatus) =>  set({endgameStatus : newStatus})
}))