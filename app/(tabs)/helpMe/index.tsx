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

const HelpMe = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <SafeAreaView>
          <MyForm />
        </SafeAreaView>
      </ScrollView>
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
