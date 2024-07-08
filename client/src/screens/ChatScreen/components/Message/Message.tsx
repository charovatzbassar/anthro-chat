import { Colors } from "@/utils";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  isUser: boolean;
  messageText: string;
};

const Message = (props: Props) => {
  return (
    <View style={{ alignItems: props.isUser ? "flex-end" : "flex-start" }}>
      <View
        style={{
          ...styles.userMessageContainer,
          backgroundColor: props.isUser
            ? Colors["orange500"]
            : Colors["red600"],
        }}
      >
        <Text
          style={{ ...styles.text, textAlign: props.isUser ? "right" : "left" }}
        >
          {props.messageText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userMessageContainer: {
    marginVertical: 16,
    width: "80%",
    padding: 12,
    borderRadius: 8,
  },
  text: {
    color: "white",
  },
});

export default Message;
