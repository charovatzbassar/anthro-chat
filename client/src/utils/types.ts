import { Socket } from "socket.io-client";

export type Message = { text: string; username: string };

export type RootStackParamList = {
  ChooseRoom: { socket: Socket };
  Chat: { socket: Socket };
};

export type MessageFormValues = {
  message: string;
};

export type RoomFormValues = {
  username: string;
  room: string;
};
