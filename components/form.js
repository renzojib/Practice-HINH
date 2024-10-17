import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/Ionicons";
import logo from "@/assets/images/banner1.jpg";

function MyForm() {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [contacts, setContacts] = useState([]); // State to store contacts
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [editIndex, setEditIndex] = useState(null); // Track index for editing

  const onSubmit = (data) => {
    if (isEditing && editIndex !== null) {
      // Edit existing contact
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = data;
      setContacts(updatedContacts);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new contact
      setContacts([...contacts, data]);
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

  const handleDelete = (index) => {
    // Remove contact from list
    const filteredContacts = contacts.filter((_, i) => i !== index);
    setContacts(filteredContacts);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.innerContainer}>
        <Image source={logo} style={styles.image} />

        {/* Form Header */}
        <View style={styles.header}>
          <Icon name="person-circle-outline" size={50} color="#004f71" />
          <Text style={styles.contactText}>
            {isEditing ? "Edit Contact" : "Add Contact"}
          </Text>
        </View>

        {/* Contact Form */}
        <View style={styles.inputRow}>
          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                  placeholder="Contact Name"
                  placeholderTextColor="#555"
                />
              )}
              name="contactName"
              defaultValue=""
              rules={{ required: "Contact name is required" }}
            />
            {errors.contactName && (
              <Text style={styles.errorText}>{errors.contactName.message}</Text>
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
                  style={styles.input}
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
              <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
            )}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.text}>
            {isEditing ? "Update Contact" : "Add Contact"}
          </Text>
        </TouchableOpacity>

        {/* List of Added Contacts */}
        <View style={styles.contactsList}>
          {contacts.map((contact, index) => (
            <View key={index} style={styles.contactCard}>
              <Text style={styles.contactCardText}>
                {contact.contactName} - {contact.phoneNumber}
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
  image: {
    width: "80%",
    height: 180,
    resizeMode: "contain",
    alignSelf: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  contactText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#004f71",
    marginTop: 10,
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
    borderColor: "gray",
    color: "#000",
    padding: 10,
    marginBottom: 5,
    width: "100%",
  },
  button: {
    backgroundColor: "#004f71",
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
    color: "white",
  },
  contactsList: {
    width: "100%",
    marginTop: 20,
  },
  contactCard: {
    padding: 15,
    backgroundColor: "#f0f0f0",
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
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default MyForm;
