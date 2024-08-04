import { MyRoomItem, TextButton } from "@/components";
import { useCreateRoom, useJoinUser, useRoomsByUser } from "@/hooks";
import { AppDispatch } from "@/store";
import { actions as chatActions, selectChat } from "@/store/slices/chatSlice";
import { Colors } from "@/utils";
import { RootTabParamList } from "@/utils/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Formik } from "formik";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type Props = BottomTabScreenProps<RootTabParamList, "MyRooms">;

const MyRoomsScreen = (props: Props) => {
  const { services, goToChatScreen } = props.route.params;
  const { user } = useSelector(selectChat);
  const { mutate: join } = useJoinUser(services.userService);

  const {
    data: rooms,
    isPending,
    isError,
  } = useRoomsByUser(services.roomService, user._id || "");

  const { mutate: createRoom } = useCreateRoom(services.roomService);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (values: { name: string }) => {
    if (values.name === "") return;

    createRoom({ name: values.name });

    values.name = "";
  };

  return (
    <View style={styles.screen}>
      {isPending && (
        <ActivityIndicator size="large" color={Colors["yellow500"]} />
      )}
      {isError && <Text style={styles.text}>Error fetching rooms</Text>}
      {rooms && rooms.length === 0 && (
        <Text style={styles.text}>No rooms found. Join a room!</Text>
      )}
      {rooms && (
        <FlatList
          data={rooms}
          keyExtractor={(item) => item._id || ""}
          renderItem={({ item }) => (
            <MyRoomItem
            userService={services.userService}
              room={item}
              onPress={() => {
                join({ userId: user._id || "", roomId: item._id || "" });
                dispatch(chatActions.setRoom({ room: item }));
                goToChatScreen();
              }}
            />
          )}
        />
      )}
      <Formik initialValues={{ name: "" }} onSubmit={onSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.addRoom}>
            <TextInput
              style={styles.input}
              placeholder="Type room name"
              placeholderTextColor={Colors["yellow500"]}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            <TextButton text="ADD" onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
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
    width: "80%",
  },
  addRoom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
    backgroundColor: Colors["darkBlue"],
  },
  text: {
    color: Colors["yellow500"],
    fontSize: 16,
  },
});

export default MyRoomsScreen;
