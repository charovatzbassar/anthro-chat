import { MyRoomItem } from "@/components";
import { useRoomsByUser } from "@/hooks";
import { selectChat } from "@/store/slices/chatSlice";
import { Colors } from "@/utils";
import { RootTabParamList } from "@/utils/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";

type Props = BottomTabScreenProps<RootTabParamList, "Browse">;

const MyRoomsScreen = (props: Props) => {
  const { services } = props.route.params;
  const { user } = useSelector(selectChat);

  const {
    data: rooms,
    isPending,
    isError,
  } = useRoomsByUser(services.roomService, user._id || "");

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
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    backgroundColor: Colors["darkBlue"],
  },
});

export default MyRoomsScreen;
