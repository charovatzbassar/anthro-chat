import { Colors } from "@/utils";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  messageText: string;
};

const UserMessage = (props: Props) => {
  return (
    <View style={styles.userMessageContainer}>
      <Text style={styles.text}>{props.messageText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userMessageContainer: {
    marginVertical: 16,
    backgroundColor: Colors["orange500"],
    width: "100%",
    padding: 12,
    borderRadius: 8,
  },
  text: {
    color: "white",
    textAlign: "right",
  },
});

export default UserMessage;
