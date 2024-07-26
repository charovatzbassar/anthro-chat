import { MyRoomItem, TextButton } from "@/components";
import { useRoomsByUser } from "@/hooks";
import { selectChat } from "@/store/slices/chatSlice";
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
import { useSelector } from "react-redux";

type Props = BottomTabScreenProps<RootTabParamList, "MyRooms">;

const MyRoomsScreen = (props: Props) => {
  const { services } = props.route.params;
  const { user } = useSelector(selectChat);

  const {
    data: rooms,
    isPending,
    isError,
  } = useRoomsByUser(services.roomService, user._id || "");

  const onSubmit = (values: { name: string }) => {
    console.log(values);
  };

  return (
    <View style={styles.screen}>
      {isPending && (
        <ActivityIndicator size="large" color={Colors["yellow500"]} />
      )}
      {isError && <Text>Error fetching rooms</Text>}
      {rooms && rooms.length === 0 && <Text>No rooms found</Text>}
      {rooms && (
        <FlatList
          data={rooms}
          keyExtractor={(item) => item._id || ""}
          renderItem={({ item }) => (
            <MyRoomItem room={item} onPress={() => {}} />
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
            <TextButton text="JOIN" onPress={() => handleSubmit()} />
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
});

export default MyRoomsScreen;
