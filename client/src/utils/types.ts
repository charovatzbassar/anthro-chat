export type Message = { text: string; username: string };

export type RootStackParamList = {
  ChooseRoom: undefined;
  Chat: undefined;
};

export type MessageFormValues = {
  message: string;
};

export type RoomFormValues = {
  username: string;
  room: string;
};
