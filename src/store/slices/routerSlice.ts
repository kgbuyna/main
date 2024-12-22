import { createSlice } from "@reduxjs/toolkit";

const routerSlice = createSlice({
  name: "router",
  initialState: { currentRoute: "login", prevRoute: "" },
  reducers: {
    back: (state, action: { payload: { activeTabKey: string } }) => {
      localStorage.setItem(action.payload.activeTabKey, state.prevRoute);
      state.currentRoute = state.prevRoute;
    },
    push: (
      state,
      action: { payload: { activeTabKey: string; dest: string } }
    ) => {
      localStorage.setItem(action.payload.activeTabKey, action.payload.dest);
      state.currentRoute = action.payload.dest;
    },
  },
});

export const { back, push } = routerSlice.actions;
export default routerSlice.reducer;
