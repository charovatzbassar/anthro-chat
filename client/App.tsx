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
import { TextButton } from "@/components";

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
            <Tab.Navigator
              initialRouteName="MyRooms"
              screenOptions={{
                headerRight: () => (
                  <TextButton text="Log out" onPress={() => {}} />
                ),
                headerStyle: {
                  backgroundColor: Colors["darkBlue"],
                },
                headerTintColor: Colors["yellow500"],
                tabBarStyle: {
                  backgroundColor: Colors["darkBlue"],
                },
                tabBarActiveTintColor: Colors["yellow500"],
                tabBarShowLabel: false,
              }}
            >
              <Tab.Screen
                name="Browse"
                component={BrowseRoomsScreen}
                initialParams={initParams}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="search" size={size} color={color} />
                  ),
                  title: "Browse Rooms",
                }}
              />
              <Tab.Screen
                name="MyRooms"
                component={MyRoomsScreen}
                initialParams={initParams}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="chatbubbles" size={size} color={color} />
                  ),
                  title: "My Rooms",
                }}
              />
              <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                initialParams={initParams}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person" size={size} color={color} />
                  ),
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
