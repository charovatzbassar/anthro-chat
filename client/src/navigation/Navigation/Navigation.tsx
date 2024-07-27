import { TextButton } from "@/components";
import {
  BrowseRoomsScreen,
  ChatScreen,
  LoginScreen,
  MyRoomsScreen,
  ProfileScreen,
  RegisterScreen,
} from "@/screens";
import { MessageService, UserService, RoomService } from "@/services";
import { Colors } from "@/utils";
import { Constants } from "@/utils";
import {
  InitParams,
  RootStackParamList,
  RootTabParamList,
} from "@/utils/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { io } from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { actions as chatActions } from "@/store/slices/chatSlice";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const initParams: InitParams = {
  socket: io(Constants.SERVER_URL, {
    transports: ["websocket"],
  }),
  services: {
    messageService: new MessageService(),
    userService: new UserService(),
    roomService: new RoomService(),
  },
};

type BottomTabProps = StackScreenProps<RootStackParamList, "BottomTab">;

const BottomTabNavigation: React.FC<BottomTabProps> = (
  props: BottomTabProps
) => {
  const dispatch = useDispatch<AppDispatch>();

  const goToChatScreen = () =>
    props.navigation.navigate("Chat", props.route.params);

  return (
    <Tab.Navigator
      initialRouteName="MyRooms"
      screenOptions={{
        headerRight: () => (
          <TextButton
            text="Log out"
            onPress={() => {
              dispatch(chatActions.clearUser());
              props.navigation.replace("Login", props.route.params);
            }}
          />
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
        initialParams={{ ...initParams, goToChatScreen }}
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
        initialParams={{ ...initParams, goToChatScreen }}
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
  );
};

const Navigation: React.FC<{}> = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        title: "AnthroChat",
        headerStyle: {
          backgroundColor: Colors["darkBlue"],
        },
        headerTintColor: Colors["yellow500"],
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        initialParams={initParams}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        initialParams={initParams}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        initialParams={initParams}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
