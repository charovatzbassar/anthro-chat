import { Colors } from "@/utils";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { io } from "socket.io-client";
import { ReceivedMessage, UserMessage } from "./components";

type Props = {};

const ChatScreen = (props: Props) => {
  return (
    <View style={styles.chatScreen}>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        placeholderTextColor={Colors["yellow500"]}
      />
      <View style={styles.messages}>
        <UserMessage messageText="Hey!" />
        <UserMessage messageText="Hey!" />
        <UserMessage messageText="Hey!" />
        <ReceivedMessage messageText="Heyy!" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatScreen: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  messages: {
    marginVertical: 12,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors["yellow500"],
    padding: 10,
    color: Colors["yellow500"],
  },
});

export default ChatScreen;
