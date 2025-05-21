import { create } from "zustand";

export const useBoardStore = create((set) => ({
    board : [
        ["r", "n", "b", "q", "k", "b", "n", "r"],
        ["p", "p", "p", "p", "p", "p", "p", "p"],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, "R", 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        ["P", "P", "P", "P", "P", "P", "P", "P"],
        ["R", "N", "B", "Q", "K", "B", "N", "R"]
    ],

    setBoard: (newBoard) => set({ board : newBoard})
    
}))