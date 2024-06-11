import { Colors } from "@/utils";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  messageText: string;
};

const ReceivedMessage = (props: Props) => {
  return (
    <View style={styles.receivedMessageContainer}>
      <Text style={styles.text}>{props.messageText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  receivedMessageContainer: {
    marginVertical: 16,
    backgroundColor: Colors["red600"],
    width: "100%",
    padding: 12,
    borderRadius: 8,
  },
  text: {
    color: "white",
    textAlign: "left",
  },
});

export default ReceivedMessage;
