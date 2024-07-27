import React from "react";
import { StyleSheet, View } from "react-native";
import { queryClient } from "@/utils";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "@/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { Navigation } from "@/navigation";

const App: React.FC<{}> = () => {
  return (
    <View style={styles.background}>
      <StatusBar style="light" />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NavigationContainer>
            <Navigation />
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
