import type { User } from "@/stores/userStore";

export interface RoomJoinedData {
  user: User;
  roomId: string;
  members: User[];
}

export interface Notification {
  title: string;
  message: string;
}
export interface MessageObjData {
  id: string;
  type: string;
  sender: User;
  data: string;
  createdAt: Date;
}
