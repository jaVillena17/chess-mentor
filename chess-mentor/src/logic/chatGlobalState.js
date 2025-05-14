import { create } from "zustand";

export const useChatStore = create((set) => ({
    chat : {},

    setChat: (newChat) => set({chat : newChat})

}))