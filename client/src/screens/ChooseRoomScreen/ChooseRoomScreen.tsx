import { selectChat } from "@/store/slices/chatSlice";
import { Colors } from "@/utils";
import { RoomFormValues, RootStackParamList } from "@/utils/types";
import { roomSchema } from "@/utils/validation";
import { StackScreenProps } from "@react-navigation/stack";
import { Formik } from "formik";
import React from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  TextInput,
  Button,
  TextStyle,
  Text,
  AppState,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { actions as roomActions } from "@/store/slices/chatSlice";
import { AppDispatch } from "@/store";

type Props = StackScreenProps<RootStackParamList, "ChooseRoom">;

type Styles = {
  container: ViewStyle;
  input: TextStyle;
  title: TextStyle;
};

const ChooseRoomScreen = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const chat = useSelector(selectChat);

  const { socket } = props.route.params;

  const onSubmit = async (values: RoomFormValues) => {
    try {
      await roomSchema.validate(values);
      socket.emit("join_room", {
        room: values.room,
        username: values.username,
        oldRoom: chat.room,
      });

      dispatch(roomActions.setUsername({ username: values.username }));
      dispatch(roomActions.setRoom({ room: values.room }));
      props.navigation.navigate("Chat", { socket });
    } catch (error) {
      return;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join a chatroom!</Text>
      <Formik initialValues={{ username: "", room: "" }} onSubmit={onSubmit}>
        {({ handleSubmit, handleBlur, handleChange, values }) => (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              placeholder="Username"
              placeholderTextColor={Colors["yellow500"]}
              value={values.username}
            />
            <TextInput
              style={styles.input}
              onChangeText={handleChange("room")}
              onBlur={handleBlur("room")}
              placeholder="Room"
              placeholderTextColor={Colors["yellow500"]}
              value={values.room}
            />
            <Button
              onPress={() => handleSubmit()}
              title="Join Room"
              color={Colors["yellow500"]}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    backgroundColor: Colors["darkBlue"],
  },
  input: {
    backgroundColor: Colors["darkBlue"],
    color: Colors["yellow500"],
    borderColor: Colors["yellow500"],
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginVertical: 12,
  },
  title: {
    color: Colors["yellow500"],
    fontSize: 24,
    marginBottom: 12,
    textAlign: "center",
  },
});

export default ChooseRoomScreen;
