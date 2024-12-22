import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

interface InitialStoreValue {
  activeTabKey: string;
  tokenKey: string;
  userKey: string;
}

const createStore = ({
  activeTabKey,
  tokenKey,
  userKey,
}: InitialStoreValue) => {
  const store = configureStore({
    reducer: {
      user: userSlice.reducer,
    },
  });

  store.dispatch(
    userSlice.actions.initialize({
      activeTabKey,
      tokenKey,
      userKey,
    })
  );

  return store;
};

export default createStore;
