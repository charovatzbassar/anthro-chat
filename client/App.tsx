import React, { useEffect, useState } from "react";
import { ChatScreen, ChooseRoomScreen } from "@/screens";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/utils";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "@/store";
import { RootStackParamList } from "@/utils/types";
import io, { Socket } from "socket.io-client";
import { SERVER_URL } from "@/utils/constants";

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC<{}> = () => {
  const socket = io(SERVER_URL, {
    transports: ["websocket"],
  });

  return (
    <View style={styles.background}>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              title: "AnthroChat",
              headerStyle: {
                backgroundColor: Colors["darkBlue"],
              },
              headerTintColor: Colors["yellow500"],
            }}
          >
            <Stack.Screen
              name="ChooseRoom"
              component={ChooseRoomScreen}
              initialParams={{ socket }}
            />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              initialParams={{ socket }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default App;
