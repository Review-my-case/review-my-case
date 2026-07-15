import { useState, useEffect, useRef } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { T } from "../theme";
import { useAuth } from "../context/AuthContext";
import { subscribeToMessages, sendMessage } from "../data/messagesService";

export default function ChatModal({ visible, onClose, caseId, caseTitle }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (!visible || !caseId) return;
    const unsubscribe = subscribeToMessages(caseId, setMessages);
    return unsubscribe;
  }, [visible, caseId]);

  const handleSend = async () => {
    if (!text.trim()) return;
    const toSend = text.trim();
    setText("");
    await sendMessage(caseId, user.uid, user.displayName || user.email, toSend);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: T.bg }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{caseTitle || "Case Messages"}</Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: T.textMuted, fontSize: 22 }}>✕</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ padding: 16, flexGrow: 1 }}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          ListEmptyComponent={
            <Text style={{ color: T.textMuted, textAlign: "center", marginTop: 40 }}>
              No messages yet. Say hello.
            </Text>
          }
          renderItem={({ item }) => {
            const isMe = item.senderId === user?.uid;
            return (
              <View style={[styles.bubbleRow, { justifyContent: isMe ? "flex-end" : "flex-start" }]}>
                <View style={[styles.bubble, { backgroundColor: isMe ? T.goldDim : T.surfaceHigh, borderColor: isMe ? T.gold + "44" : T.border }]}>
                  {!isMe && <Text style={styles.senderName}>{item.senderName}</Text>}
                  <Text style={{ color: T.textPrimary, fontSize: 14 }}>{item.text}</Text>
                </View>
              </View>
            );
          }}
        />

        <View style={styles.inputRow}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type a message..."
            placeholderTextColor={T.textMuted}
            style={styles.input}
            multiline
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
            <Text style={{ color: "#07070f", fontWeight: "800" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: T.border,
  },
  title: { color: T.textPrimary, fontSize: 17, fontWeight: "800" },
  bubbleRow: { flexDirection: "row", marginBottom: 10 },
  bubble: { maxWidth: "78%", borderWidth: 1, borderRadius: 14, padding: 12 },
  senderName: { color: T.gold, fontSize: 11, fontWeight: "700", marginBottom: 3 },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: T.border,
  },
  input: {
    flex: 1,
    backgroundColor: T.surfaceHigh,
    borderWidth: 1,
    borderColor: T.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: T.textPrimary,
    fontSize: 14,
    maxHeight: 100,
  },
  sendBtn: {
    backgroundColor: T.gold,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
