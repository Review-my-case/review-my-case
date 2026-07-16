import { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { T } from "../../theme";
import { db } from "../../firebase/config";
import Card from "../../components/Card";
import Label from "../../components/Label";
import { setVerificationStatus } from "../../data/verificationService";

export default function AdminVerificationsScreen() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "users"), where("verificationStatus", "==", "pending"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setPending(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h2}>Pending Verifications ({pending.length})</Text>
      <Text style={{ color: T.textMuted, fontSize: 12, marginBottom: 20 }}>Manually reviewed — no automated face matching is used.</Text>

      {loading ? (
        <ActivityIndicator color={T.gold} style={{ marginTop: 30 }} />
      ) : pending.length === 0 ? (
        <Text style={{ color: T.textMuted, textAlign: "center", marginTop: 30 }}>Nothing waiting for review.</Text>
      ) : (
        <View style={{ gap: 12 }}>
          {pending.map((p) => (
            <Card key={p.id}>
              <Label>{p.name} · {p.email}</Label>
              {p.phone && <Text style={{ color: T.textMuted, fontSize: 12, marginBottom: 10 }}>{p.phone}</Text>}
              <View style={{ flexDirection: "row", gap: 10, marginBottom: 14 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: T.textSecondary, fontSize: 11, marginBottom: 4 }}>ID</Text>
                  {p.idPhotoUrl && <Image source={{ uri: p.idPhotoUrl }} style={styles.thumb} />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: T.textSecondary, fontSize: 11, marginBottom: 4 }}>Selfie</Text>
                  {p.selfiePhotoUrl && <Image source={{ uri: p.selfiePhotoUrl }} style={styles.thumb} />}
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <TouchableOpacity style={styles.approveBtn} onPress={() => setVerificationStatus(p.id, "verified")}>
                  <Text style={{ color: T.emerald, fontWeight: "700" }}>✓ Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectBtn} onPress={() => setVerificationStatus(p.id, "rejected")}>
                  <Text style={{ color: T.red, fontWeight: "700" }}>✕ Reject</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  h2: { color: T.textPrimary, fontSize: 22, fontWeight: "800", letterSpacing: -0.5, marginBottom: 4 },
  thumb: { width: "100%", height: 120, borderRadius: 8, backgroundColor: T.surfaceHigh },
  approveBtn: { flex: 1, backgroundColor: T.emeraldDim, borderWidth: 1, borderColor: T.emerald + "44", borderRadius: 10, paddingVertical: 10, alignItems: "center" },
  rejectBtn: { flex: 1, backgroundColor: T.redDim, borderWidth: 1, borderColor: T.red + "44", borderRadius: 10, paddingVertical: 10, alignItems: "center" },
});
