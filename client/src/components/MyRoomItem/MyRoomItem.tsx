import { RoomDto } from "@/dto";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TextButton from "../TextButton";

type Props = {
  room: RoomDto;
  onPress: () => void;
};

const MyRoomItem = (props: Props) => {
  return (
    <View style={styles.roomContainer}>
      <View>
        <Text style={styles.roomTitle}>{props.room.name}</Text>
      </View>
      <View>
        <TextButton text="chat" onPress={props.onPress} color="green" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  roomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MyRoomItem;
