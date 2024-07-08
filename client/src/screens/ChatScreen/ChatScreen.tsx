import { Colors } from "@/utils";
import React, { useEffect, useRef } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Message as MessageComponent } from "./components";
import { Formik } from "formik";
import IconButton from "./components/IconButton/IconButton";
import { ScrollView } from "react-native-gesture-handler";
import { Message } from "@/utils/types";

type Props = {};

const ChatScreen = (props: Props) => {
  const messagesRef = useRef<ScrollView>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollToEnd({ animated: false });
    }
  }, []);

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
            <IconButton
              onPress={handleSubmit}
              color={Colors["yellow500"]}
              size={32}
            />
          </View>
        )}
      </Formik>
      <ScrollView style={styles.messages} ref={messagesRef}>
        <MessageComponent messageText="Hey!" />
        <MessageComponent sender="Daniel" messageText="Hey!" />
        <MessageComponent messageText="Hey!" />
        <MessageComponent sender="Daniel" messageText="Heyy!" />
        <MessageComponent messageText="Heyy!" />
        <MessageComponent messageText="Heyy!" />
        <MessageComponent sender="Daniel" messageText="Heyy!" />
        <MessageComponent messageText="Hey!" />
        <MessageComponent sender="Daniel" messageText="Hey!" />
        <MessageComponent sender="Daniel" messageText="Hey!" />
        <MessageComponent sender="Daniel" messageText="Hey!" />
        <MessageComponent sender="Daniel" messageText="Hey!" />
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
