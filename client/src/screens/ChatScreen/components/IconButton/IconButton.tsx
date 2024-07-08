import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/utils";

type Props = {
  onPress: () => void;
  color: string;
  size: number;
};

type Styles = {
  container: ViewStyle;
};

const IconButton = (props: Props) => {
  return (
    <Pressable
      style={styles.container}
      onPress={props.onPress}
      android_ripple={{
        color: Colors["yellow500"],
        radius: 32,
        borderless: false,
      }}
    >
      <Ionicons
        name="paper-plane-outline"
        color={props.color}
        size={props.size}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    overflow: "hidden",
    padding: 8,
    borderRadius: 10,
    borderColor: Colors["yellow500"],
    borderWidth: 1,
  },
});

export default IconButton;
