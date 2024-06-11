import React from "react";
import { ChatScreen } from "@/screens";
import { Text, StyleSheet, TextInput, SafeAreaView, View } from "react-native";
import { Colors } from "@/utils";

const App: React.FC<{}> = () => {
  return (
    <SafeAreaView style={styles.background}>
      <ChatScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors["darkBlue"],
    flex: 1,
    padding: 12,
  },
});

export default App;
