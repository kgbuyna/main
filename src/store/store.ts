import { configureStore } from "@reduxjs/toolkit";
import routerReducer from "./slices/routerSlice";

const store1 = configureStore({
  reducer: {
    router: routerReducer,
  },
});

const store2 = configureStore({
  reducer: {
    router: routerReducer,
  },
});

export { store1, store2 };
