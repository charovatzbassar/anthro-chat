import React from "react";
import {
  BrowseRoomsScreen,
  ChatScreen,
  ChooseRoomScreen,
  MyRoomsScreen,
  ProfileScreen,
} from "@/screens";
import { Button, StyleSheet, View } from "react-native";
import { Colors, queryClient } from "@/utils";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "@/store";
import {
  InitParams,
  RootStackParamList,
  RootTabParamList,
} from "@/utils/types";
import io from "socket.io-client";
import { SERVER_URL } from "@/utils/constants";
import { MessageService, RoomService, UserService } from "@/services";
import { QueryClientProvider } from "@tanstack/react-query";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const initParams: InitParams = {
  socket: io(SERVER_URL, {
    transports: ["websocket"],
  }),
  services: {
    messageService: new MessageService(),
    userService: new UserService(),
    roomService: new RoomService(),
  },
};

const StackNavigation: React.FC<{}> = () => {
  return (
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
  );
};

const App: React.FC<{}> = () => {
  return (
    <View style={styles.background}>
      <StatusBar style="light" />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NavigationContainer>
            <Tab.Navigator screenOptions={{
              headerRight: () => <Button title="Log out" />,
            }}>
              <Tab.Screen
                name="Browse"
                component={BrowseRoomsScreen}
                initialParams={initParams}
                options={{
                  tabBarIcon: () => <Ionicons name="search" size={24} />,
                }}
              />
              <Tab.Screen
                name="MyRooms"
                component={MyRoomsScreen}
                initialParams={initParams}
                options={{
                  tabBarIcon: () => <Ionicons name="chatbubbles" size={24} />,
                }}
              />
              <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                initialParams={initParams}
                options={{
                  tabBarIcon: () => <Ionicons name="person" size={24} />,
                }}
              />
            </Tab.Navigator>
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
