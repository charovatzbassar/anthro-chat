import { MessageService, RoomService, UserService } from "@/services";
import { Socket } from "socket.io-client";

export type InitParams = {
  socket: Socket;
  services: {
    messageService: MessageService;
    userService: UserService;
    roomService: RoomService;
  };
};

export type RootTabParamList = {
  Browse: InitParams & { goToChatScreen: () => void };
  MyRooms: InitParams & { goToChatScreen: () => void };
  Profile: InitParams;
};

export type Message = { text: string; username: string };

export type RootStackParamList = {
  Login: InitParams;
  Register: InitParams;
  BottomTab: InitParams;
  Chat: InitParams;
};

export type MessageFormValues = {
  text: string;
};

export type LoginFormValues = {
  username: string;
  password: string;
};

export type RegisterFormValues = {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
};
