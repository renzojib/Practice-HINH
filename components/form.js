import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Appearance,
  Linking,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { Collapsible } from "./Collapsible";
import Icon from "react-native-vector-icons/Ionicons";

function MyForm() {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Trigger validation on change
  });

  const [contacts, setContacts] = useState([]); // State to store contacts
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [editIndex, setEditIndex] = useState(null); // Track index for editing
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  // Load saved contacts on component mount
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const storedContacts = await AsyncStorage.getItem("contacts");
        if (storedContacts) {
          setContacts(JSON.parse(storedContacts));
        }
      } catch (e) {
        console.log("Failed to load contacts:", e);
      }
    };

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    loadContacts(); // Load contacts on component mount

    return () => subscription.remove();
  }, []);

  const colors = {
    background: theme === "dark" ? "#1e1e1e" : "#fff",
    cardBackground: theme === "dark" ? "#2c2c2c" : "#f0f0f0",
    borderColor: theme === "dark" ? "#444" : "#ccc",
    textColor: theme === "dark" ? "#fff" : "#000",
    buttonColor: isValid ? "#004f71" : "gray",
    buttonTextColor: "#fff",
    errorTextColor: "red",
  };

  const onSubmit = async (data) => {
    let updatedContacts;
    if (isEditing && editIndex !== null) {
      // Edit existing contact
      updatedContacts = [...contacts];
      updatedContacts[editIndex] = data;
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new contact
      updatedContacts = [...contacts, data];
    }

    setContacts(updatedContacts);

    // Save the contacts to AsyncStorage
    try {
      await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));
    } catch (e) {
      console.log("Failed to save contacts:", e);
    }

    reset(); // Reset the form after submit
  };

  const handleEdit = (index) => {
    // Set form values to the selected contact's values for editing
    setValue("contactName", contacts[index].contactName);
    setValue("phoneNumber", contacts[index].phoneNumber);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    // Remove contact from list
    const filteredContacts = contacts.filter((_, i) => i !== index);
    setContacts(filteredContacts);

    // Update the stored contacts in AsyncStorage
    try {
      await AsyncStorage.setItem("contacts", JSON.stringify(filteredContacts));
    } catch (e) {
      console.log("Failed to delete contact:", e);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        { backgroundColor: colors.background },
      ]}
    >
      <View style={styles.innerContainer}>
        {/* Contact Form */}
        <Collapsible title="Enter Emergency Contacts">
          <View style={styles.inputRow}>
            <View style={styles.inputWrapper}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={[
                      styles.input,
                      {
                        borderColor: colors.borderColor,
                        color: colors.textColor,
                      },
                    ]}
                    placeholder="Contact Name"
                    placeholderTextColor="#555"
                  />
                )}
                name="contactName"
                defaultValue=""
                rules={{ required: "Contact name is required" }}
              />
              {errors.contactName && (
                <Text
                  style={[styles.errorText, { color: colors.errorTextColor }]}
                >
                  {errors.contactName.message}
                </Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={[
                      styles.input,
                      {
                        borderColor: colors.borderColor,
                        color: colors.textColor,
                      },
                    ]}
                    placeholder="Phone Number"
                    placeholderTextColor="#555"
                    keyboardType="phone-pad"
                  />
                )}
                name="phoneNumber"
                defaultValue=""
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid phone number (10 digits)",
                  },
                }}
              />
              {errors.phoneNumber && (
                <Text
                  style={[styles.errorText, { color: colors.errorTextColor }]}
                >
                  {errors.phoneNumber.message}
                </Text>
              )}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.buttonColor }]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid} // Disable button if form is not valid
          >
            <Text style={[styles.text, { color: colors.buttonTextColor }]}>
              {isEditing ? "Update Contact" : "Add Contact"}
            </Text>
          </TouchableOpacity>
        </Collapsible>

        {/* List of Added Contacts */}
        <View style={styles.contactsList}>
          {contacts.map((contact, index) => (
            <View
              key={index}
              style={[
                styles.contactCard,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              <Text
                style={[styles.contactCardText, { color: colors.textColor }]}
              >
                {contact.contactName}: {contact.phoneNumber}{" "}
                <Icon
                  name="call-outline"
                  size={50}
                  color="#004f71"
                  onPress={() => {
                    Linking.openURL(`tel:${contact.phoneNumber}`);
                  }}
                />
                <Icon
                  name="chatbox-outline"
                  size={50}
                  color="#004f71"
                  onPress={() => {
                    Linking.openURL(
                      `sms:${contact.phoneNumber}?body=${encodeURIComponent(
                        "Help is here!"
                      )}`
                    );
                  }}
                />
              </Text>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  onPress={() => handleEdit(index)}
                  style={styles.editButton}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(index)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  innerContainer: {
    width: "100%",
    alignItems: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  inputWrapper: {
    width: "48%",
  },
  input: {
    borderWidth: 1,
    color: "#000", // Default text color
    padding: 10,
    marginBottom: 5,
    width: "100%",
  },
  button: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 5,
    width: "60%",
    marginTop: 25,
    marginBottom: 25,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  contactsList: {
    width: "100%",
    marginTop: 20,
  },
  contactCard: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  contactCardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  editButton: {
    marginRight: 10,
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
  },
  errorText: {
    fontSize: 12,
    marginBottom: 10,
  },
});

export default MyForm;
