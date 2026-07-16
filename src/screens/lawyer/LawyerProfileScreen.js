import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Label from "../../components/Label";
import Avatar from "../../components/Avatar";
import Pill from "../../components/Pill";
import { PrimaryBtn } from "../../components/Buttons";
import { useAuth } from "../../context/AuthContext";
import VerifyIdentityModal from "../../components/VerifyIdentityModal";

const SPECIALIZATIONS = ["Criminal Defense", "Appeals", "Wrongful Conviction", "Civil Rights", "Asset Recovery"];

const VERIFICATION_LABELS = {
  not_submitted: ["Not verified", T.textMuted],
  pending: ["Pending review", T.amber],
  verified: ["Verified ✓", T.emerald],
  rejected: ["Rejected — resubmit", T.red],
};

export default function LawyerProfileScreen() {
  const { user, profile, signOut } = useAuth();
  const [verifyOpen, setVerifyOpen] = useState(false);
  const initials = (user?.displayName || "L").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const vStatus = profile?.verificationStatus || "not_submitted";
  const [vLabel, vColor] = VERIFICATION_LABELS[vStatus];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={{ alignItems: "center", paddingVertical: 28, marginBottom: 16 }}>
        <Avatar initials={initials} size={72} />
        <Text style={styles.name}>{user?.displayName || "Lawyer"}</Text>
        <Text style={{ color: T.textSecondary, fontSize: 14, marginBottom: 4 }}>{user?.email}</Text>
        {profile?.phone && <Text style={{ color: T.textMuted, fontSize: 13, marginBottom: 10 }}>{profile.phone}</Text>}
        <Pill label={vLabel} color={vColor} />
      </Card>

      {vStatus !== "verified" && (
        <Card accent={T.amber} style={{ backgroundColor: T.amberDim, marginBottom: 16 }}>
          <Text style={{ color: T.amber, fontWeight: "700", fontSize: 14, marginBottom: 6 }}>Identity verification required</Text>
          <Text style={{ color: T.textSecondary, fontSize: 13, lineHeight: 19, marginBottom: 12 }}>
            You'll need to verify your identity before accepting cases.
          </Text>
          <PrimaryBtn small onPress={() => setVerifyOpen(true)}>Verify Now</PrimaryBtn>
        </Card>
      )}

      <Card style={{ marginBottom: 16 }}>
        <Label>Specializations</Label>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {SPECIALIZATIONS.map((s, i) => (
            <View key={i} style={styles.specChip}>
              <Text style={{ color: T.textSecondary, fontSize: 13 }}>{s}</Text>
            </View>
          ))}
        </View>
      </Card>

      <TouchableOpacity style={styles.signOut} onPress={signOut}>
        <Text style={{ color: T.red, fontSize: 15, fontWeight: "600" }}>Sign Out</Text>
      </TouchableOpacity>

      <VerifyIdentityModal visible={verifyOpen} onClose={() => setVerifyOpen(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  name: { color: T.textPrimary, fontSize: 22, fontWeight: "800", marginTop: 14, marginBottom: 4 },
  specChip: { backgroundColor: T.surfaceHigh, borderWidth: 1, borderColor: T.border, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  signOut: { borderWidth: 1, borderColor: T.red + "44", borderRadius: 14, paddingVertical: 13, alignItems: "center", marginTop: 4 },
});
