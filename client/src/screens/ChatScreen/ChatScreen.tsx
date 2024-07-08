import { Colors } from "@/utils";
import React from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Message } from "./components";
import { Formik } from "formik";
import IconButton from "./components/IconButton/IconButton";

type Props = {};

const ChatScreen = (props: Props) => {
  return (
    <View style={styles.chatScreen}>
      <Formik
        initialValues={{ message: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit, handleBlur, handleChange, values }) => (
          <View style={styles.messageForm}>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("message")}
              onBlur={handleBlur("message")}
              placeholder="Type a message..."
              placeholderTextColor={Colors["yellow500"]}
              value={values.message}
            />
            <IconButton onPress={handleSubmit} color={Colors["yellow500"]} size={32} />
          </View>
        )}
      </Formik>
      <View style={styles.messages}>
        <Message isUser={true} messageText="Hey!" />
        <Message isUser={false} messageText="Hey!" />
        <Message isUser={true} messageText="Hey!" />
        <Message isUser={false} messageText="Heyy!" />
        <Message isUser={true} messageText="Heyy!" />
        <Message isUser={true} messageText="Heyy!" />
        <Message isUser={false} messageText="Heyy!" />
        <Message isUser={true} messageText="Hey!" />
        <Message isUser={false} messageText="Hey!" />
      </View>
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
  }
});

export default ChatScreen;
