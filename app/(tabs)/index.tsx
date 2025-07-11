import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { Calendar } from "react-native-calendars";

export default function HomeScreen() {
  const [eventColor, setEventColor] = useState("#a1c4fd");
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [eventText, setEventText] = useState("");
  const [events, setEvents] = useState({});

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const handleAddEvent = () => {
    const newEvents = {
      ...events,
      [selectedDate]: eventText,
    };

    const newMarked = {
      ...markedDates,
      [selectedDate]: {
        marked: true,
        selected: true,
        selectedColor: eventColor,
      },
    };

    setEvents(newEvents);
    setMarkedDates(newMarked);
    setEventText("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 My Sweet Calendar</Text>
      <Calendar onDayPress={handleDayPress} markedDates={markedDates} />

      {selectedDate && events[selectedDate] && (
        <Text style={styles.eventText}>
          📌 {selectedDate}: {events[selectedDate]}
        </Text>
      )}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add event for {selectedDate}</Text>
            <TextInput
              placeholder="Write your event..."
              style={styles.input}
              value={eventText}
              onChangeText={setEventText}
            />
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              {["#a1c4fd", "#fdcb6e", "#fab1a0", "#81ecec"].map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setEventColor(color)}
                  style={{
                    backgroundColor: color,
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    margin: 5,
                    borderWidth: eventColor === color ? 2 : 0,
                    borderColor: "#333",
                  }}
                />
              ))}
            </View>

            <Button title="Save Event" onPress={handleAddEvent} />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 20,
    color: "#6c5ce7",
    fontWeight: "bold",
  },
  eventText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#2d3436",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 30,
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, marginBottom: 10 },
  input: { borderColor: "#ccc", borderWidth: 1, padding: 10, marginBottom: 10 },
  closeButton: { marginTop: 10, alignItems: "center" },
  closeText: { color: "#d63031", fontWeight: "bold" },
});
