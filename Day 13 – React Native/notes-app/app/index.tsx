import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/Feather';

type Note = {
  id: string;
  text: string;
};

const STORAGE_KEY = "MY_NOTES";

export default function Home() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Load notes on start
  useEffect(() => {
    loadNotes();
  }, []);

  // Save notes whenever changed
  useEffect(() => {
    saveNotes();
  }, [notes]);

  const addOrUpdateNote = () => {
    if (note.trim() === "") return;

    if (editingId) {
      setNotes((prev) =>
        prev.map((n) => (n.id === editingId ? { ...n, text: note } : n)),
      );
      setEditingId(null);
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        text: note,
      };
      setNotes((prev) => [...prev, newNote]);
    }

    setNote("");
  };

  const startEdit = (item: Note) => {
    setNote(item.text);
    setEditingId(item.id);
  };

  const deleteNote = (id: string) => {
    Alert.alert("Delete Note", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () =>
          setNotes((prev) => prev.filter((note) => note.id !== id)),
      },
    ]);
  };

  const saveNotes = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  };

  const loadNotes = async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) setNotes(JSON.parse(stored));
  };

  const filteredNotes = notes.filter((n) =>
    n.text.toLowerCase().includes(search.toLowerCase()),
  );

  const theme = darkMode ? darkStyles : lightStyles;

  return (
    <View style={theme.container}>
      <Text style={theme.title}>My Notes</Text>

      {/* Dark Mode Toggle */}
      <View style={theme.switchRow}>
        <Text style={theme.switchText}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      {/* Search */}
      <TextInput
        style={theme.input}
        placeholder="Search notes..."
        placeholderTextColor={darkMode ? "#aaa" : "#555"}
        value={search}
        onChangeText={setSearch}
      />

      {/* Add / Edit Input */}
      <TextInput
        style={theme.input}
        placeholder="Write a note..."
        placeholderTextColor={darkMode ? "#aaa" : "#555"}
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity style={theme.button} onPress={addOrUpdateNote}>
        <Text style={theme.buttonText}>
          {editingId ? "Update Note" : "Add Note"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={theme.noteItem}>
            <Text style={theme.noteText}>{item.text}</Text>

            <View style={theme.actions}>
              <TouchableOpacity
                style={theme.editButton}
                onPress={() => startEdit(item)}
              >
                <Icon
                  name="edit"
                  size={20}
                  color={darkMode ? "white" : "black"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={theme.deleteButton}
                onPress={() => deleteNote(item.id)}
              >
                <Icon name="trash-2" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

/* LIGHT THEME */
const lightStyles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  noteItem: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  noteText: { marginBottom: 8 },
  actions: { flexDirection: "row", justifyContent: "space-between" },
  editButton: { padding: 5 },
  deleteButton: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteText: { color: "white", fontWeight: "bold" },
  actionText: { fontSize: 18 },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  switchText: { fontSize: 16 },
});

/* DARK THEME */
const darkStyles = StyleSheet.create({
  ...lightStyles,
  container: { ...lightStyles.container, backgroundColor: "#121212" },
  title: { ...lightStyles.title, color: "white" },
  input: {
    ...lightStyles.input,
    backgroundColor: "#1e1e1e",
    color: "white",
    borderColor: "#333",
  },
  noteItem: {
    ...lightStyles.noteItem,
    backgroundColor: "#1e1e1e",
  },
  noteText: { color: "white" },
  switchText: { color: "white" },
});
