import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice";

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
