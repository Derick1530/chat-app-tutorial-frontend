import { create } from "zustand";
import { Message, User } from "./userStore";
import { MessageObjData } from "@/types";

export interface MessageState {
  message: MessageObjData[];
  user: User | null;
  setMessage: (message: MessageObjData[]) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  message: [],
  user: null,
  setMessage: (message) => set({ message }),
}));
