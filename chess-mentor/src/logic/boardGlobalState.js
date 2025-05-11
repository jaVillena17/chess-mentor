import { create } from "zustand";

export const useBoardStore = create((set) => ({
    board : [
        ["Tb","Hb","Bb","Qb","Kb","Bb","Hb","Tb"],
        ["Pb","Pb","Pb","Pb","Pb","Pb","Pb","Pb"],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        ["Pw","Pw","Pw","Pw","Pw","Pw","Pw","Pw"],
        ["Tw","Hw","Bw","Qw","Kw","Bw","Hw","Tw"]
    ],

    setBoard: (newBoard) => set({ board : newBoard})
    
}))