"use client";
import { socket } from "@/lib/sockets";
import { useMessageStore } from "@/stores/messageStore";
import { MessageObjData } from "@/types";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import customParseFormat from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);

const Page = () => {
  const [messageText, setMessageText] = useState("");
  const [messagesList, setMessagesList] = useState<MessageObjData[]>([]);
  const lastItemRef = useRef<HTMLLIElement | null>(null);
  const [getAdmin, setGetAdmin] = useState<string | null>("");

  const [messages, setMessages] = useMessageStore((state) => [
    state.message,
    state.setMessage,
  ]);

  const messageList = useCallback((message: MessageObjData) => {
    setMessagesList((prev) => [...prev, message]);
  }, []);

  const roomId = usePathname().slice(1);
  useEffect(() => {
    setGetAdmin(localStorage.getItem("admin"));
  }, []);
  
  useEffect(() => {
    socket.on("receive-message", messageList);
    return () => {
      socket.off("receive-message");
    };
  }, [messageList, messages, setMessages]);


  useEffect(() => {
    if (messagesList.length === 0) return;
    lastItemRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  function onSubmit() {
    setMessageText("");
    socket.emit("send-message", {
      roomId: roomId,
      data: messageText,
      type: "text",
    });
  }

  return (
    <div className="flex flex-col  p-6 rounded-sm h-[85vh] w-full">
      <div className="h-full border mb-6 flex flex-col grow">
        <p className="border-b py-4 px-4 grow">Room Chat</p>
        <div className="overflow-y-scroll h-full">
          <ul>
            {messagesList.map(({ id, sender, data, createdAt }) => {
              console.log(createdAt);
              const time = dayjs(createdAt).add(1, "h").toNow();
              return (
                <li className="w-full" key={id}>
                  <div
                    className={` flex ${
                      getAdmin && getAdmin === sender.id
                        ? "  justify-end"
                        : "justify-start"
                    } p-2`}
                  >
                    <p
                      className={` ${
                        getAdmin && getAdmin === sender.id ? " hidden" : ""
                      }  bg-teal-600 w-8 h-8 self-end mx-2 rounded-full`}
                    >
                      <span className="uppercase text-lg font-bold text-gray-200 flex justify-center items-center self-center">
                        {sender.username.charAt(0)}
                      </span>
                    </p>
                    <p
                      className={` rounded-md px-6 py-2 ${
                        getAdmin && getAdmin === sender.id
                          ? "bg-teal-700 text-gray-100"
                          : "bg-white/25 text-white"
                      }  max-w-[20rem]  break-words`}
                    >
                      {" "}
                      {data}
                    </p>
                  </div>
                  <div>
                    <p
                      className={` flex text-xs font-medium ${
                        getAdmin && getAdmin === sender.id
                          ? "  justify-end hidden"
                          : "justify-start ml-16"
                      }`}
                    >
                      {time}
                    </p>
                  </div>
                </li>
              );
            })}
            <li className="mt-3" ref={lastItemRef}></li>
          </ul>
        </div>
      </div>
      <div className="flex items-center gap-x-7">
        <input
          type=""
          value={messageText}
          onChange={(e) => {
            setMessageText(e.target.value);
          }}
          className="w-full py-2 pl-6 bg-transparent border"
          placeholder="Type something..."
        />
        <button onClick={onSubmit} className="border px-12 py-2">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Page;
