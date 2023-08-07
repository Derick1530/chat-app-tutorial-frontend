import { io } from "socket.io-client";

const SERVER =
  process.env.NODE_ENV === "production"
    ? "https://rich-speed-race-production.up.railway.app"
    : "http://localhost:3001";

export const socket = io(SERVER, { transports: ["websocket"] });
