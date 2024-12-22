import { push } from "@/store/slices/routerSlice";
import { UserType } from "@/types/base";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<UserType | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    if (!token) return;

    setToken(token);
    const tab = localStorage.getItem(activeTabKey);

    dispatch(push({ activeTabKey, dest: tab || "login" }));
  }, []);

  return (
    <UserContext.Provider
      value={{ tokenKey, user, setUser, token, setToken, activeTabKey }}
    >
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
