import { MessageService, RoomService, UserService } from "@/services";
import { Socket } from "socket.io-client";

export type InitParams = {
  socket: Socket;
  messageService: MessageService;
  userService: UserService;
  roomService: RoomService;
};

export type Message = { text: string; username: string };

export type RootStackParamList = {
  ChooseRoom: InitParams;
  Chat: InitParams;
};

export type MessageFormValues = {
  text: string;
};

export type RoomFormValues = {
  username: string;
  room: string;
};
