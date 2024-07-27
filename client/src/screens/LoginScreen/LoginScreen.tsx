import { TextButton } from "@/components";
import { AppDispatch } from "@/store";
import { Colors, Validation } from "@/utils";
import { LoginFormValues, RootStackParamList } from "@/utils/types";
import { StackScreenProps } from "@react-navigation/stack";
import { Formik } from "formik";
import React from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useDispatch } from "react-redux";
import { actions as chatActions } from "@/store/slices/chatSlice";

type Props = StackScreenProps<RootStackParamList, "Login">;

type Styles = {
  container: ViewStyle;
  input: TextStyle;
  title: TextStyle;
  submit: ViewStyle;
};

const LoginScreen = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (values: LoginFormValues) => {
    const isValid = await Validation.loginSchema.isValid(values);

    if (!isValid) {
      Alert.alert(
        "Invalid input",
        "Please enter a valid username and password"
      );
      return;
    }

    dispatch(
      chatActions.setUser({
        user: {
          username: values.username,
          password: values.password,
        },
      })
    );
    props.navigation.replace("BottomTab", props.route.params);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in to AnthroChat!</Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, handleBlur, handleChange, values }) => (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              placeholder="Username"
              placeholderTextColor={Colors["yellow500"]}
              value={values.username}
            />
            <TextInput
              style={styles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholder="Password"
              placeholderTextColor={Colors["yellow500"]}
              value={values.password}
              secureTextEntry={true}
            />
            <View style={styles.submit}>
              <TextButton
                onPress={handleSubmit}
                text="Log in"
                color={Colors["yellow500"]}
              />
              <Pressable
                onPress={() =>
                  props.navigation.replace("Register", props.route.params)
                }
              >
                <Text style={{ color: Colors["yellow500"], marginTop: 12 }}>
                  Don't have an account? Register here!
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    backgroundColor: Colors["darkBlue"],
  },
  input: {
    backgroundColor: Colors["darkBlue"],
    color: Colors["yellow500"],
    borderColor: Colors["yellow500"],
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginVertical: 12,
  },
  title: {
    color: Colors["yellow500"],
    fontSize: 24,
    marginBottom: 12,
    textAlign: "center",
  },
  submit: {
    width: "100%",
    alignItems: "center",
  },
});

export default LoginScreen;
