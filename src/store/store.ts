import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

interface InitialStoreValue {
  userKey: string;
}

const createStore = ({ userKey }: InitialStoreValue) => {
  const store = configureStore({
    reducer: {
      user: userSlice.reducer,
    },
  });

  store.dispatch(
    userSlice.actions.initialize({
      userKey,
    })
  );

  return store;
};

export default createStore;
