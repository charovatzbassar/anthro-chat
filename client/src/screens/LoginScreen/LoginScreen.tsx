import { TextButton } from "@/components";
import { Colors } from "@/utils";
import { LoginFormValues, RootStackParamList } from "@/utils/types";
import { StackScreenProps } from "@react-navigation/stack";
import { Formik } from "formik";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type Props = StackScreenProps<RootStackParamList, "Login">;

type Styles = {
  container: ViewStyle;
  input: TextStyle;
  title: TextStyle;
  submit: ViewStyle;
};

const LoginScreen = (props: Props) => {
  const onSubmit = (values: LoginFormValues) => {
    props.navigation.navigate("BottomTab", props.route.params);
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
            />
            <View style={styles.submit}>
              <TextButton
                onPress={handleSubmit}
                text="Log in"
                color={Colors["yellow500"]}
              />
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
