import { create } from "zustand"

export const UserSession = create((set) => ({
    user: false,

    setUser: (newUser) => set({user : newUser})
}))
