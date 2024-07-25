import { Colors } from "@/utils";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  messageText: string;
  sender?: string;
};

const Message = (props: Props) => {
  return (
    <>
      {props.sender === "Server" ? (
        <Text style={styles.serverText}>{props.messageText}</Text>
      ) : (
        <View style={{ alignItems: !props.sender ? "flex-end" : "flex-start" }}>
          <View
            style={{
              ...styles.userMessageContainer,
              backgroundColor: !props.sender
                ? Colors["orange500"]
                : Colors["red600"],
            }}
          >
            <Text
              style={{
                ...styles.text,
                textAlign: !props.sender ? "right" : "left",
              }}
            >
              {props.sender && props.sender + ":"} {props.messageText}
            </Text>
          </View>
        </View>
      )}
    </>
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
  serverText: {
    color: Colors["yellow500"],
    textAlign: "center",
    marginVertical: 12,
    
  }
});

export default Message;
