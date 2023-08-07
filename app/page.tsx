"use client";

import { socket } from "@/lib/sockets";
import { createRoomSchema } from "@/lib/validation/createRoom";
import { joinRoomSchema } from "@/lib/validation/joinRoom";
import { useMembersStore } from "@/stores/memberStore";
import { useUserStore } from "@/stores/userStore";
import { RoomJoinedData } from "@/types";
import CreateRoomBox from "@/ui/RoomActions/CreateRoomBox";
import JoinRoomBox from "@/ui/RoomActions/JoinRoomBox";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import * as z from "zod";

const roomId = nanoid();

export default function Home() {
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);
  const setMembers = useMembersStore((state) => state.setMembers);


  useEffect(() => {
    socket.on("room-joined", ({ user, roomId, members }: RoomJoinedData) => {
      console.log("join-room", user, roomId);
      window.localStorage.setItem("admin", user.id);

      setUser(user);
      setMembers(members);
      router.replace(`/${roomId}`);
    });

    function handleErrorMessage({ message }: { message: string }) {
      console.log("Failed to join");
    }

    socket.on("room-not-found", handleErrorMessage);

    socket.on("invalid-data", handleErrorMessage);

    return () => {
      socket.off("room-joined");
      socket.off("room-not-found");
      socket.off("invalid-data", handleErrorMessage);
    };
  }, [router, setUser, setMembers]);

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-10 px-6 items-center">
      <CreateRoomBox />
      <JoinRoomBox />
    </div>
  );
}
