import { socket } from "@/lib/sockets";
import React, { FormEvent, useState } from "react";

const JoinRoomBox = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string>("");

  const joinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!roomId.trim() || !userName.trim())
      return setError("You need to fill in all fields.");
    socket.emit("join-room", { roomId, username: userName });
  };

  return (
    <form onSubmit={joinRoom} className=" border p-6 rounded-md">
      <div className="space-x-4">
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className=" bg-transparent focus:outline-none border-b pb-2 pl-6"
          type="text"
          placeholder="Your Name"
        />

        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className=" bg-transparent focus:outline-none border-b pb-2 pl-6"
          type="text"
          placeholder="Insert Room ID"
        />

        {error && <p className="text-xs">{error}</p>}
      </div>
      <div className="mt-12">
        <button type="submit" className="border rounded-md py-1  w-full">
          Join Room
        </button>
      </div>
    </form>
  );
};

export default JoinRoomBox;
