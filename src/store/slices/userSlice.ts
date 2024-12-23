import { Route } from "@/types/base";
import { UserType } from "@/types/userType";
import { createSlice } from "@reduxjs/toolkit";

interface UserStateType {
  // Local Storage Keys
  activeTabKey: string;
  tokenKey: string;
  userKey: string;
  currentRoute: Route;
  token: null | string;
  user: Partial<UserType> | null;
}

const initialState: UserStateType = {
  activeTabKey: "",
  tokenKey: "",
  userKey: "",
  currentRoute: "login",
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    push: (state, action: { payload: Route }) => {
      const dest = action.payload;

      localStorage.setItem(state.activeTabKey, dest);
      state.currentRoute = dest;
    },
    setToken: (state, action: { payload: string }) => {
      const token = action.payload;
      localStorage.setItem(state.tokenKey, token);

      state.token = token;
    },
    setUser: (state, action: { payload: Partial<UserType> | null }) => {
      const user = action.payload;
      localStorage.setItem(state.userKey, JSON.stringify(user));
      state.user = { ...state.user, ...user } as UserType;
    },
    login: (
      state,
      action: { payload: { user: Partial<UserType>; token: string } }
    ) => {
      const { user, token } = action.payload;
      state.user = {
        id: user.id!,
        username: user.username!,
      };

      state.token = token;
      state.currentRoute = "inbox";
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem(state.activeTabKey);
      localStorage.removeItem(state.tokenKey);
      localStorage.removeItem(state.userKey);
      state.token = null;
      state.currentRoute = "login";
    },
    initialize: (
      state,
      action: {
        payload: { activeTabKey: string; tokenKey: string; userKey: string };
      }
    ) => {
      const { activeTabKey, tokenKey, userKey } = action.payload;
      const token = localStorage.getItem(tokenKey);

      state.tokenKey = tokenKey;
      state.activeTabKey = activeTabKey;
      state.userKey = userKey;

      if (!token) {
        state.currentRoute = "login";
        state.token = null;
        state.user = null;
        return; // Exit early since there's no token
      }

      const user = JSON.parse(
        localStorage.getItem(userKey) || "{}"
      ) as UserType;
      const currentRoute =
        (localStorage.getItem(activeTabKey) as Route) || "login";

      // Update remaining state properties
      state.currentRoute = currentRoute;
      state.token = token;
      state.user = user;
    },
  },
});

export const { push, setToken, setUser, logout, login } = userSlice.actions;
export default userSlice;
