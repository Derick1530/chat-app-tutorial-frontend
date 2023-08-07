import { create } from "zustand";

export interface User {
  id: string;
  username: string;
}
export interface Message {
  id: string;
  message: string;
  username: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
