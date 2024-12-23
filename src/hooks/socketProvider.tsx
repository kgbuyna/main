import React, { createContext, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

export interface ServerToClientEvents {
  onMessage: (data: { message: string; sender: string }) => void;
}

export interface ClientToServerEvents {
  sendMessage: (data: { message: string; recipient: string }) => void;
}

// Define the shape of the context
interface SocketContextType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  connected: boolean;
}

// Define the shape of the context
interface SocketContextType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  connected: boolean;
}

// Create context with default value of null socket
const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: React.ReactNode;
}

// Socket provider component
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  // Access the token from Redux state
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!token) {
      console.error("No token found in Redux store");
      return;
    }

    // Initialize the socket connection
    socketRef.current = io("http://localhost:8000", {
      transports: ["websocket"],
      auth: { token },
      autoConnect: false,
    });

    const socket = socketRef.current;

    // Handle socket events
    if (socket) {
      socket.connect();
      socket.on("connect", () => {
        console.log("Connected with socket ID:", socket.id);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected");
      });

      return () => {
        socket.disconnect();
      };
    }
  }, []); // Re-run effect when token changes

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use socket context
export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
