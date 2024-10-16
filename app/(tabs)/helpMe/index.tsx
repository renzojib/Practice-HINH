import React from "react";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

import MyForm from "@/components/form";
import { FormDataProvider } from "@/components/FormDataContext";

const HelpMe = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 0}
      >
        <ScrollView>
          <SafeAreaView>
            <FormDataProvider>
              <MyForm />
            </FormDataProvider>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default HelpMe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
