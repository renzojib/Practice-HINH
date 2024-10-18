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

const AddContacts = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
    
        <ScrollView>
          <SafeAreaView>
            <FormDataProvider>
              <MyForm />
            </FormDataProvider>
          </SafeAreaView>
        </ScrollView>
    </GestureHandlerRootView>
  );
};

export default AddContacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
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