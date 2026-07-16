import { useState } from "react";
import { Modal, View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ActivityIndicator, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { T } from "../theme";
import Card from "./Card";
import Label from "./Label";
import { PrimaryBtn } from "./Buttons";
import { useAuth } from "../context/AuthContext";
import { submitVerification } from "../data/verificationService";

async function pickImage(setUri) {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    Alert.alert("Camera permission needed", "Please allow camera access to take this photo.");
    return;
  }
  const result = await ImagePicker.launchCameraAsync({ quality: 0.6, base64: false });
  if (!result.canceled) {
    setUri(result.assets[0].uri);
  }
}

export default function VerifyIdentityModal({ visible, onClose }) {
  const { user, profile } = useAuth();
  const [idPhoto, setIdPhoto] = useState(null);
  const [selfiePhoto, setSelfiePhoto] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const status = profile?.verificationStatus || "not_submitted";

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await submitVerification(user.uid, idPhoto, selfiePhoto);
      Alert.alert("Submitted", "Your documents were submitted for review by a real person — it may take some time.");
      onClose?.();
    } catch (e) {
      Alert.alert("Upload failed", "Something went wrong uploading your photos. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: T.bg }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Identity Verification</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: T.textMuted, fontSize: 22 }}>✕</Text>
          </TouchableOpacity>
        </View>

        {status === "verified" ? (
          <View style={styles.centered}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>✅</Text>
            <Text style={{ color: T.emerald, fontSize: 18, fontWeight: "800" }}>You're verified</Text>
          </View>
        ) : status === "pending" ? (
          <View style={styles.centered}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>⏳</Text>
            <Text style={{ color: T.textPrimary, fontSize: 18, fontWeight: "800", marginBottom: 6 }}>Under review</Text>
            <Text style={{ color: T.textSecondary, fontSize: 14, textAlign: "center" }}>
              Your ID and photo were submitted. An admin will review them manually.
            </Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.subtitle}>
              {status === "rejected"
                ? "Your last submission was rejected. Please try again with clearer photos."
                : "Required before you can submit or accept cases. Reviewed by a real person, not an automated system."}
            </Text>

            <Card style={{ marginBottom: 16 }}>
              <Label>Step 1 — Photo of a valid government ID</Label>
              {idPhoto ? (
                <Image source={{ uri: idPhoto }} style={styles.preview} />
              ) : (
                <TouchableOpacity style={styles.captureBtn} onPress={() => pickImage(setIdPhoto)}>
                  <Text style={{ color: T.gold, fontWeight: "700" }}>📷 Take Photo of ID</Text>
                </TouchableOpacity>
              )}
              {idPhoto && (
                <TouchableOpacity onPress={() => pickImage(setIdPhoto)} style={{ marginTop: 8 }}>
                  <Text style={{ color: T.textMuted, fontSize: 12 }}>Retake photo</Text>
                </TouchableOpacity>
              )}
            </Card>

            <Card style={{ marginBottom: 20 }}>
              <Label>Step 2 — Selfie of your face</Label>
              {selfiePhoto ? (
                <Image source={{ uri: selfiePhoto }} style={styles.preview} />
              ) : (
                <TouchableOpacity style={styles.captureBtn} onPress={() => pickImage(setSelfiePhoto)}>
                  <Text style={{ color: T.gold, fontWeight: "700" }}>🤳 Take Selfie</Text>
                </TouchableOpacity>
              )}
              {selfiePhoto && (
                <TouchableOpacity onPress={() => pickImage(setSelfiePhoto)} style={{ marginTop: 8 }}>
                  <Text style={{ color: T.textMuted, fontSize: 12 }}>Retake photo</Text>
                </TouchableOpacity>
              )}
            </Card>

            {submitting ? (
              <ActivityIndicator color={T.gold} />
            ) : (
              <PrimaryBtn onPress={handleSubmit} disabled={!idPhoto || !selfiePhoto}>
                Submit for Review
              </PrimaryBtn>
            )}
          </ScrollView>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 56, paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: T.border },
  headerTitle: { color: T.textPrimary, fontSize: 17, fontWeight: "800" },
  container: { padding: 20, paddingBottom: 40 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", padding: 30 },
  subtitle: { color: T.textSecondary, fontSize: 14, lineHeight: 20, marginBottom: 24 },
  captureBtn: { borderWidth: 1.5, borderColor: T.gold + "44", backgroundColor: T.goldDim, borderRadius: 12, paddingVertical: 24, alignItems: "center" },
  preview: { width: "100%", height: 180, borderRadius: 12, backgroundColor: T.surfaceHigh },
});
