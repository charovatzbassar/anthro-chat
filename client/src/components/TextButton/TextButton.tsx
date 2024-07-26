import { Colors } from "@/utils";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  text: string;
  onPress: () => void;
  color?: string;
};

const TextButton = (props: Props) => {
  return (
    <Pressable
      style={styles.button}
      onPress={props.onPress}
      android_ripple={{
        color: props.color || Colors["yellow500"],
        borderless: false,
      }}
    >
      <Text
        style={{ ...styles.text, color: props.color || Colors["yellow500"] }}
      >
        {props.text.toUpperCase()}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    padding: 8,
    borderRadius: 8,
  },
  button: {
    width: 75,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TextButton;
