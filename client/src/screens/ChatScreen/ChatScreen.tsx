import { Colors } from "@/utils";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Message as MessageComponent } from "./components";
import { Formik } from "formik";
import IconButton from "./components/IconButton/IconButton";
import { ScrollView } from "react-native-gesture-handler";
import { Message, MessageFormValues, RootStackParamList } from "@/utils/types";
import { useSelector } from "react-redux";
import { selectChat } from "@/store/slices/chatSlice";
import { StackScreenProps } from "@react-navigation/stack";
import { USER_TYPING_TIMEOUT_LENGTH } from "@/utils/constants";
import { MessageService } from "@/services";

type Props = StackScreenProps<RootStackParamList, "Chat">;

type Styles = {
  chatScreen: ViewStyle;
  messages: ViewStyle;
  input: TextStyle;
  messageForm: ViewStyle;
  typingText: TextStyle;
};

const ChatScreen = (props: Props) => {
  const { room, username } = useSelector(selectChat);

  const { socket } = props.route.params;

  const messagesRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(
    new Set<string>()
  );

  let typingTimeout: NodeJS.Timeout | null = null;

  props.navigation.setOptions({ title: room });

  const messageService = new MessageService();

  useEffect(() => {
    messageService.findAll().then((data) => {
      console.log(data);
    });
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((currMessages) => [
        ...currMessages,
        { text: data.text, username: data.username },
      ]);
    });

    socket.on("someone_is_typing", (data) => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      setTypingUsers((currTypingUsers) => {
        currTypingUsers.add(data.username);
        return new Set(currTypingUsers);
      });
      typingTimeout = setTimeout(() => {
        setTypingUsers((currTypingUsers) => {
          currTypingUsers.delete(data.username);
          return new Set(currTypingUsers);
        });
      }, USER_TYPING_TIMEOUT_LENGTH);
    });

    if (messagesRef.current) {
      messagesRef.current.scrollToEnd({ animated: false });
    }
  }, [socket]);

  const onSubmit = async (values: MessageFormValues) => {
    if (values.text === "") return;

    socket.emit("send_message", {
      text: values.text,
      room,
      username,
    });
    setMessages((currMessages) => [
      ...currMessages,
      { username, text: values.text },
    ]);
    values.text = "";
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
                  username,
                  room,
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
        {messages.map((msg, idx) => (
          <MessageComponent
            key={idx}
            messageText={msg.text}
            sender={msg.username !== username ? msg.username : undefined}
          />
        ))}
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
