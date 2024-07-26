import { RoomItem } from "@/components";
import { useRooms } from "@/hooks";
import { Colors } from "@/utils";
import { RootTabParamList } from "@/utils/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { FlatList } from "react-native";

type Props = BottomTabScreenProps<RootTabParamList, "Browse">;

const BrowseRoomsScreen = (props: Props) => {
  const { services } = props.route.params;
  const { data: rooms, isPending } = useRooms(services.roomService);

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
              onPress={() => {}}
            />
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

export default BrowseRoomsScreen;
