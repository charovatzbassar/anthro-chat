import { TextButton } from "@/components";
import { Colors } from "@/utils";
import { RegisterFormValues, RootStackParamList } from "@/utils/types";
import { StackScreenProps } from "@react-navigation/stack";
import { Formik } from "formik";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type Props = StackScreenProps<RootStackParamList, "Register">;

type Styles = {
  container: ViewStyle;
  input: TextStyle;
  title: TextStyle;
  submit: ViewStyle;
};

const RegisterScreen = (props: Props) => {
  const onSubmit = (values: RegisterFormValues) => {
    props.navigation.replace("BottomTab", props.route.params);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register to AnthroChat!</Text>
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
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
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              placeholder="Email"
              placeholderTextColor={Colors["yellow500"]}
              value={values.email}
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
                text="Register"
                color={Colors["yellow500"]}
              />
              <Pressable
                onPress={() =>
                  props.navigation.replace("Login", props.route.params)
                }
              >
                <Text style={{ color: Colors["yellow500"], marginTop: 12 }}>
                  Already have an account? Log in here!
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

export default RegisterScreen;
