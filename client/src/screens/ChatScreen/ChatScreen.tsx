import { Colors } from "@/utils";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Message as MessageComponent } from "./components";
import { Formik } from "formik";
import IconButton from "./components/IconButton/IconButton";
import { ScrollView } from "react-native-gesture-handler";
import { Message, MessageFormValues, RootStackParamList } from "@/utils/types";
import { useSelector } from "react-redux";
import { selectChat } from "@/store/slices/chatSlice";
import { StackScreenProps } from "@react-navigation/stack";
import { USER_TYPING_TIMEOUT_LENGTH } from "@/utils/constants";

type Props = StackScreenProps<RootStackParamList, "Chat">;

const ChatScreen = (props: Props) => {
  const { room, username } = useSelector(selectChat);

  const { socket } = props.route.params;

  const messagesRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  let typingTimeout: NodeJS.Timeout | null = null;

  props.navigation.setOptions({ title: room });

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
      setIsTyping(true);
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
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
      {isTyping && (
        <Text style={{ color: Colors["yellow500"] }}>Someone is typing...</Text>
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

const styles = StyleSheet.create({
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
});

export default ChatScreen;
