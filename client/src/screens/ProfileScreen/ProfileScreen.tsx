import { selectChat } from "@/store/slices/chatSlice";
import { Colors } from "@/utils";
import { RootTabParamList } from "@/utils/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

type Props = BottomTabScreenProps<RootTabParamList, "Profile">;

const ProfileScreen = (props: Props) => {
  const { user } = useSelector(selectChat);
  return (
    <View style={styles.screen}>
      <View style={styles.userData}>
        <Text style={styles.text}>Username: {user.username}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    backgroundColor: Colors["darkBlue"],
  },
  userData: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors["yellow500"],
  },
  text: {
    color: Colors["darkBlue"],
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
