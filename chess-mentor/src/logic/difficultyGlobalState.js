import { create } from "zustand";

export const DiffGlobalState = create((set) => ({
    diff : "easy",
    setDiff : (newState) => set({diff : newState})
}))