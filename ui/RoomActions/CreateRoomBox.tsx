import { socket } from "@/lib/sockets";
import { nanoid } from "nanoid";
import React, { FormEvent, useEffect, useState } from "react";
import { Clipboard } from "lucide-react";
// const roomId = nanoid();

const CreateRoomBox = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string>("");

  useEffect(() => {
    setRoomId(nanoid());
  }, []);

  const createRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!roomId.trim() || !userName.trim())
      return setError("You need to fill in your Name.");
    socket.emit("create-room", { roomId, username: userName });
  };

  return (
    <form onSubmit={createRoom} className=" border p-6 rounded-md">
      <div className="space-y-4">
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className=" bg-transparent focus:outline-none border-b pb-2 pl-6"
          type="text"
          placeholder="Your Name"
        />

        <div className="flex w-fit px-6 bg-white/50 rounded-md py-1 items-center justify-between">
          <p className=" text-black">{roomId}</p>
          <Clipboard size={18} className="text-neutral-200 ml-5" />
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>

      <div className="mt-12">
        <button type="submit" className="border rounded-md py-1  w-full">
          Create a Room
        </button>
      </div>
    </form>
  );
};

export default CreateRoomBox;
