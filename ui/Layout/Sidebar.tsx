"use client";

import { socket } from "@/lib/sockets";
import { useMembersStore } from "@/stores/memberStore";
import { Notification } from "@/types";
import React, { useEffect, useState } from "react";
import { useToast } from "../useToast";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
const Sidebar = () => {
  const router = useRouter();
  const [showMembers, setShowMembers] = useState(false);
  const { toast } = useToast();
  const [members, setMembers] = useMembersStore((state) => [
    state.members,
    state.setMembers,
  ]);

  const leaveRoom = () => {
    socket.emit("leave-room");
    router.replace("/");
  };

  useEffect(() => {
    socket.on("update-members", (members) => {
      setMembers(members);
    });
    console.log("Triggered");
    socket.on("send-notification", ({ title, message }: Notification) => {
      alert(`${title}, ${message}`);
    });

    return () => {
      socket.off("update-members");
      socket.off("send-notification");
    };
  }, [setMembers]);

  return (
    <div className="flex justify-between items-center">
      {showMembers && (
        <div
          onClick={() => {
            setShowMembers(false);
          }}
          className=""
        >
          <p className="border-b pb-2">Members Online </p>
          <ul className="flex flex-col gap-1 rounded-md px-1">
            {members.map(({ id, username }) => (
              <li key={id}>{username}</li>
            ))}
          </ul>
        </div>
      )}

      {!showMembers && (
        <button
          className="text-center border"
          onClick={() => {
            setShowMembers((prev) => !prev);
          }}
        >
          <ChevronDown size={12} />
        </button>
      )}
      <div>
        <button
          onClick={leaveRoom}
          className="text-xs text-red-500 border-red-500/30 py-1 px-4 rounded-md border"
        >
          Leave the Room
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
