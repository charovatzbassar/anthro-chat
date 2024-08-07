import { RoomItem } from "@/components";
import { useJoinUser, useRooms } from "@/hooks";
import { AppDispatch } from "@/store";
import { actions as chatActions, selectChat } from "@/store/slices/chatSlice";
import { Colors } from "@/utils";
import { RootTabParamList } from "@/utils/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type Props = BottomTabScreenProps<RootTabParamList, "Browse">;

const BrowseRoomsScreen = (props: Props) => {
  const { services, goToChatScreen } = props.route.params;
  const { data: rooms, isPending, isError } = useRooms(services.roomService);
  const { user } = useSelector(selectChat);
  const dispatch = useDispatch<AppDispatch>();
  const { mutate: join } = useJoinUser(services.userService);

  return (
    <View style={styles.screen}>
      {isPending ? (
        <ActivityIndicator size="large" color={Colors["yellow500"]} />
      ) : (
        <FlatList
          data={rooms}
          keyExtractor={(item) => item._id || ""}
          renderItem={({ item }) => (
            <RoomItem
              room={item}
              roomService={services.roomService}
              onPress={() => {
                join({
                  userId: user._id || "",
                  roomId: item._id || "",
                });
                dispatch(chatActions.setRoom({ room: item }));
                goToChatScreen();
              }}
            />
          )}
        />
      )}
      {isError && <Text style={styles.text}>Failed to get rooms</Text>}
      {rooms && rooms.length === 0 && <Text style={styles.text}>No rooms</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    backgroundColor: Colors["darkBlue"],
  },
  text: {
    color: Colors["yellow500"],
    fontSize: 16,
  },
});

export default BrowseRoomsScreen;
