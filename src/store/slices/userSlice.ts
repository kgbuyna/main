import { Route, UserStateType } from "@/types/base";
import { UserType } from "@/types/userType";
import { getUserData, updateUserData } from "@/utils/handlers";
import { createSlice } from "@reduxjs/toolkit";


const initialState: UserStateType = {
  // activeTabKey: "",
  // tokenKey: "",
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

      updateUserData(state.userKey, "currentRoute", dest);

      state.currentRoute = dest;
    },
    setToken: (state, action: { payload: string }) => {
      const token = action.payload;

      updateUserData(state.userKey, "token", token);

      state.token = token;
    },
    setUser: (state, action: { payload: Partial<UserType> | null }) => {
      const user = action.payload;
      updateUserData(state.userKey, "user", JSON.stringify(user));
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
      updateUserData(state.userKey, "user", JSON.stringify(user));
      updateUserData(state.userKey, "token", token);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem(state.userKey);
      state.token = null;
      state.currentRoute = "login";
    },
    initialize: (
      state,
      action: {
        payload: { userKey: UserStateType["userKey"] };
      }
    ) => {
      const { userKey } = action.payload;
      state.userKey = userKey;
      const token = getUserData(userKey, "token");
      if (!token) {
        state.currentRoute = "login";
        state.token = null;
        state.user = null;
        return; // Exit early since there's no token
      }

      const user = getUserData(userKey, "user");

      const currentRoute =
        (getUserData(userKey, "currentRoute") as Route) || "login";

      // Update remaining state properties
      state.currentRoute = currentRoute;
      state.token = token as string;
      state.user = user as UserType;
    },
  },
});

export const { push, setToken, setUser, logout, login } = userSlice.actions;
export default userSlice;
