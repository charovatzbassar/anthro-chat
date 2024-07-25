import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { RoomDto, UserDto } from "@/dto";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    user: {} as UserDto,
    room: {} as RoomDto,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setRoom: (state, action) => {
      state.room = action.payload.room;
    },
  },
});

export default chatSlice.reducer;
export const actions = chatSlice.actions;
export const selectChat = (state: RootState) => state.chat;
