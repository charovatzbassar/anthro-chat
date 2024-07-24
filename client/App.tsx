import React, { useEffect } from "react";
import { ChatScreen, ChooseRoomScreen } from "@/screens";
import { StyleSheet, View } from "react-native";
import { Colors, queryClient } from "@/utils";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "@/store";
import { InitParams, RootStackParamList } from "@/utils/types";
import io from "socket.io-client";
import { SERVER_URL } from "@/utils/constants";
import { MessageService, RoomService, UserService } from "@/services";
import { QueryClientProvider } from "@tanstack/react-query";

const Stack = createStackNavigator<RootStackParamList>();

const initParams: InitParams = {
  socket: io(SERVER_URL, {
    transports: ["websocket"],
  }),
  messageService: new MessageService(),
  userService: new UserService(),
  roomService: new RoomService(),
};

const App: React.FC<{}> = () => {
  return (
    <View style={styles.background}>
      <StatusBar style="light" />
      <QueryClientProvider client={queryClient}>
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
                initialParams={initParams}
              />
              <Stack.Screen
                name="Chat"
                component={ChatScreen}
                initialParams={initParams}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </QueryClientProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default App;
