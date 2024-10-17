import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import DraggableFlatList from "react-native-draggable-flatlist"; // Import DraggableFlatList

function MyForm() {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      contactName: "",
      phoneNumber: "",
    },
  });

  const [contacts, setContacts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const onSubmit = (data) => {
    if (isEditing && editIndex !== null) {
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = data;
      setContacts(updatedContacts);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setContacts([...contacts, data]);
    }
    reset();
  };

  const handleEdit = (index) => {
    setValue("contactName", contacts[index].contactName);
    setValue("phoneNumber", contacts[index].phoneNumber);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filteredContacts = contacts.filter((_, i) => i !== index);
    setContacts(filteredContacts);
  };

  const moveContact = (fromIndex, toIndex) => {
    const updatedContacts = [...contacts];
    const [movedContact] = updatedContacts.splice(fromIndex, 1);
    updatedContacts.splice(toIndex, 0, movedContact);
    setContacts(updatedContacts);
  };

  const renderContactItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        onLongPress={drag}
        style={[styles.contactCard, isActive && styles.activeCard]}
      >
        <Text style={styles.contactCardText}>
          {item.contactName} - {item.phoneNumber}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
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

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isValid ? "#004f71" : "gray" },
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          <Text style={styles.text}>
            {isEditing ? "Update Contact" : "Add Contact"}
          </Text>
        </TouchableOpacity>

        <DraggableFlatList
          data={contacts}
          renderItem={renderContactItem}
          keyExtractor={(item, index) => index.toString()}
          onDragEnd={({ data }) => setContacts(data)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderColor: "gray",
    color: "#000",
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
    color: "white",
  },
  contactCard: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 15,
  },
  activeCard: {
    backgroundColor: "#d0d0d0",
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
