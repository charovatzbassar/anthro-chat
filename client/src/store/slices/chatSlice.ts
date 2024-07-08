import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    username: "",
    room: "",
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload.username;
    },
    setRoom: (state, action) => {
      state.room = action.payload.room;
    },
  },
});

export default chatSlice.reducer;
export const actions = chatSlice.actions;
export const selectChat = (state: RootState) => state.chat;
