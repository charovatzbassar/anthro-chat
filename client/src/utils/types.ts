import { MessageService } from "@/services";
import { Socket } from "socket.io-client";

export type Message = { text: string; username: string };

export type RootStackParamList = {
  ChooseRoom: { socket: Socket };
  Chat: { socket: Socket, messageService: MessageService };
};

export type MessageFormValues = {
  text: string;
};

export type RoomFormValues = {
  username: string;
  room: string;
};
