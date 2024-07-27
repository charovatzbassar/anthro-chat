import { RoomDto } from "@/dto";
import { useRoomUserCount } from "@/hooks";
import { RoomService } from "@/services";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TextButton from "../TextButton";

type Props = {
  room: RoomDto;
  roomService: RoomService;
  onPress: () => void;
};

const RoomItem = (props: Props) => {
  const { data: memberCount } = useRoomUserCount(
    props.roomService,
    props.room._id || ""
  );

  return (
    <View style={styles.roomContainer}>
      <View>
        <Text style={styles.roomTitle}>{props.room.name}</Text>
        <Text>Members: {memberCount}</Text>
      </View>
      <View>
        <TextButton text="Join" onPress={props.onPress} color="green" />
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

export default RoomItem;
