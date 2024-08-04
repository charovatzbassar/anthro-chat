import { RoomDto } from "@/dto";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import TextButton from "../TextButton";
import { UserService } from "@/services";
import { useUsersByRoom } from "@/hooks";

type Props = {
  room: RoomDto;
  userService: UserService;
  onPress: () => void;
};

const MyRoomItem = (props: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { data: roomUsers } = useUsersByRoom(
    props.userService,
    props.room._id || ""
  );

  return (
    <View style={styles.roomContainer}>
      <View>
        <Text style={styles.roomTitle}>{props.room.name}</Text>
      </View>
      <View>
        <TextButton text="chat" onPress={props.onPress} color="green" />
        <TextButton
          text="users"
          onPress={() => setModalVisible(true)}
          color="black"
        />
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>Users in {props.room.name}</Text>
          {roomUsers &&
            roomUsers.length <= 20 &&
            roomUsers.map((user) => (
              <Text key={user._id}>{user.username}</Text>
            ))}
          {roomUsers && roomUsers.length > 20 && (
            <Text>Too many users to display</Text>
          )}
          <TextButton
            text="close"
            onPress={() => setModalVisible(false)}
            color="red"
          />
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MyRoomItem;
