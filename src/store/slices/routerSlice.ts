import { createSlice } from "@reduxjs/toolkit";

const routerSlice = createSlice({
  name: "router",
  initialState: { currentRoute: "login", prevRoute: "" },
  reducers: {
    back: (state) => {
      state.currentRoute = state.prevRoute;
    },
    push: (state, action) => {
      state.currentRoute = action.payload;
    },
  },
});

export const { back, push } = routerSlice.actions;
export default routerSlice.reducer;
