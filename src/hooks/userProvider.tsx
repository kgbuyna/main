import { push } from "@/store/slices/userSlice";
import { UserType } from "@/types/base";
import { createContext, ReactNode, useContext, useState } from "react";
import { useDispatch } from "react-redux";

interface UserContextProps {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  token: string;
  tokenKey: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  activeTabKey: string;
  //   logout: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({
  tokenKey,
  children,
  activeTabKey,
}: {
  tokenKey: string;
  children: ReactNode;
  activeTabKey: string;
}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const dispatch = useDispatch();

  return (
    <UserContext.Provider value={{ tokenKey, user, setUser, activeTabKey }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
