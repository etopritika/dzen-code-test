import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export function useActiveSessions() {
  const [activeSessions, setActiveSessions] = useState<number>(0);

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("activeSessions", (count: number) => {
      setActiveSessions(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return activeSessions;
}
