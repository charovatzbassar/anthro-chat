import React from "react";
import { ChatScreen } from "@/screens";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Colors } from "@/utils";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

const App: React.FC<{}> = () => {
  return (
    <View style={styles.background}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          title: "AnthroChat",
          headerStyle: {
            backgroundColor: Colors["darkBlue"],
          },
          headerTintColor: Colors["yellow500"],
        }}>
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default App;
