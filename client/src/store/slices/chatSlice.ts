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
    clearUser: (state) => {
      state.user = {} as UserDto;
    },
    setRoom: (state, action) => {
      state.room = action.payload.room;
    },
    clearRoom: (state) => {
      state.room = {} as RoomDto;
    },
  },
});

export default chatSlice.reducer;
export const actions = chatSlice.actions;
export const selectChat = (state: RootState) => state.chat;
