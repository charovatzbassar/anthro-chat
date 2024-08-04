import { Colors } from "@/utils";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { Message as MessageComponent } from "./components";
import { Formik } from "formik";
import IconButton from "./components/IconButton/IconButton";
import { ScrollView } from "react-native-gesture-handler";
import { Message, MessageFormValues, RootStackParamList } from "@/utils/types";
import { useSelector } from "react-redux";
import { selectChat } from "@/store/slices/chatSlice";
import { StackScreenProps } from "@react-navigation/stack";
import { Constants } from "@/utils";
import { useCreateMessage, useMessagesByRoom } from "@/hooks";
import { MessageDto } from "@/dto";
import { io } from "socket.io-client";

type Props = StackScreenProps<RootStackParamList, "Chat">;

type Styles = {
  chatScreen: ViewStyle;
  messages: ViewStyle;
  input: TextStyle;
  messageForm: ViewStyle;
  typingText: TextStyle;
};

const ChatScreen = (props: Props) => {
  const { room, user } = useSelector(selectChat);

  const { services } = props.route.params;

  const socket = io(Constants.SERVER_URL, {
    transports: ["websocket"],
  });

  const { data: fetchedMessages, isPending: isMessagesPending } =
    useMessagesByRoom(services.messageService, room.name);

  const messagesRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(
    new Set<string>()
  );

  const { mutate: createMessage } = useCreateMessage(services.messageService);

  const scrollToEnd = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollToEnd({ animated: true });
    }
  };

  let typingTimeout: NodeJS.Timeout | null = null;

  props.navigation.setOptions({ title: room.name });

  useEffect(() => {
    if (fetchedMessages) {
      setMessages(
        fetchedMessages.map((msg) => {
          const messageDto = new MessageDto(
            msg.text,
            msg.room,
            msg.user,
            msg._id
          );
          return messageDto.toMessageState();
        })
      );
    }
  }, [fetchedMessages]);

  useEffect(() => {
    socket.emit("join_room", {
      room: room.name,
      username: user.username,
    });

    socket.on("receive_message", (data) => {

      if (data.username === user.username) return;

      setMessages((currMessages) => [
        ...currMessages,
        { text: data.text, username: data.username },
      ]);
      scrollToEnd();
    });

    socket.on("someone_is_typing", (data) => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      setTypingUsers((currTypingUsers) => {
        if (user.username !== data.username) {
          currTypingUsers.add(data.username);
        }
        return new Set(currTypingUsers);
      });
      typingTimeout = setTimeout(() => {
        setTypingUsers(() => {
          return new Set();
        });
      }, Constants.USER_TYPING_TIMEOUT_LENGTH);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onSubmit = async (values: MessageFormValues) => {
    if (values.text === "") return;

    createMessage(new MessageDto(values.text, room._id || "", user._id || ""));

    socket.emit("send_message", {
      text: values.text,
      room: room.name,
      username: user.username,
    });
    setMessages((currMessages) => [
      ...currMessages,
      { username: user.username, text: values.text },
    ]);
    values.text = "";
    scrollToEnd();
  };

  return (
    <View style={styles.chatScreen}>
      <Formik initialValues={{ text: "" }} onSubmit={onSubmit}>
        {({ handleSubmit, handleBlur, handleChange, values }) => (
          <View style={styles.messageForm}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                handleChange("text")(text);

                socket.emit("user_typing", {
                  username: user.username,
                  room: room.name,
                  userIsTyping: true,
                });
              }}
              onBlur={handleBlur("text")}
              placeholder="Type a message..."
              placeholderTextColor={Colors["yellow500"]}
              value={values.text}
            />
            <IconButton
              onPress={handleSubmit}
              color={Colors["yellow500"]}
              size={32}
            />
          </View>
        )}
      </Formik>
      {typingUsers.size > 0 && (
        <Text style={styles.typingText}>
          {Array.from(typingUsers).join(", ")} is typing...
        </Text>
      )}
      <ScrollView style={styles.messages} ref={messagesRef}>
        {isMessagesPending ? (
          <ActivityIndicator size="large" />
        ) : (
          messages.map((msg, idx) => (
            <MessageComponent
              key={idx}
              messageText={msg.text}
              sender={msg.username !== user.username ? msg.username : undefined}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  chatScreen: {
    flex: 1,
    flexDirection: "column-reverse",
    padding: 12,
    backgroundColor: Colors["darkBlue"],
  },
  messages: {
    marginVertical: 12,
  },
  input: {
    height: 55,
    borderRadius: 10,
    width: "80%",
    borderWidth: 1,
    borderColor: Colors["yellow500"],
    padding: 10,
    color: Colors["yellow500"],
  },
  messageForm: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typingText: { color: Colors["yellow500"] },
});

export default ChatScreen;
