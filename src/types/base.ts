import { UserType } from "./userType";

export type Route = "login" | "sign-up" | "inbox" | "friends";

export default interface Base {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserStateType {
  // Local Storage Keys
  // activeTabKey: string;
  // tokenKey: string;
  userKey: string;

  currentRoute: Route;
  token: null | string;
  user: Partial<UserType> | null;
}
