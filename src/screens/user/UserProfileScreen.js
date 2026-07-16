import { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Avatar from "../../components/Avatar";
import Pill from "../../components/Pill";
import { PrimaryBtn, GhostBtn } from "../../components/Buttons";
import { MOCK_USER } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import VerifyIdentityModal from "../../components/VerifyIdentityModal";

const VERIFICATION_LABELS = {
  not_submitted: ["Not verified", T.textMuted],
  pending: ["Pending review", T.amber],
  verified: ["Verified ✓", T.emerald],
  rejected: ["Rejected — resubmit", T.red],
};

export default function UserProfileScreen() {
  const { user, profile, signOut } = useAuth();
  const [editing, setEditing] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [name, setName] = useState(user?.displayName || MOCK_USER.name);
  const [email, setEmail] = useState(user?.email || MOCK_USER.email);

  const vStatus = profile?.verificationStatus || "not_submitted";
  const [vLabel, vColor] = VERIFICATION_LABELS[vStatus];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={{ marginBottom: 16, alignItems: "center", paddingVertical: 28 }}>
        <Avatar initials={(user?.displayName || "U").slice(0, 2).toUpperCase()} size={72} color={T.gold} />
        {editing ? (
          <View style={{ marginTop: 16, width: "100%", gap: 10 }}>
            <TextInput value={name} onChangeText={setName} style={styles.input} />
            <TextInput value={email} onChangeText={setEmail} style={styles.input} />
            <View style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}>
              <PrimaryBtn small onPress={() => setEditing(false)}>Save Changes</PrimaryBtn>
              <GhostBtn small onPress={() => setEditing(false)}>Cancel</GhostBtn>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.name}>{name}</Text>
            <Text style={{ color: T.textSecondary, fontSize: 14, marginBottom: 4 }}>{email}</Text>
            {profile?.phone && <Text style={{ color: T.textMuted, fontSize: 13, marginBottom: 8 }}>{profile.phone}</Text>}
            <Pill label={vLabel} color={vColor} />
            <View style={{ height: 12 }} />
            <GhostBtn small onPress={() => setEditing(true)}>Edit Profile</GhostBtn>
          </>
        )}
      </Card>

      {vStatus !== "verified" && (
        <Card accent={T.amber} style={{ backgroundColor: T.amberDim, marginBottom: 16 }}>
          <Text style={{ color: T.amber, fontWeight: "700", fontSize: 14, marginBottom: 6 }}>Identity verification required</Text>
          <Text style={{ color: T.textSecondary, fontSize: 13, lineHeight: 19, marginBottom: 12 }}>
            You'll need to verify your identity before submitting a case.
          </Text>
          <PrimaryBtn small onPress={() => setVerifyOpen(true)}>Verify Now</PrimaryBtn>
        </Card>
      )}

      <TouchableOpacity style={styles.signOut} onPress={signOut}>
        <Text style={{ color: T.red, fontSize: 15, fontWeight: "600" }}>Sign Out</Text>
      </TouchableOpacity>

      <VerifyIdentityModal visible={verifyOpen} onClose={() => setVerifyOpen(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  input: { backgroundColor: T.surfaceHigh, borderWidth: 1, borderColor: T.border, borderRadius: 10, padding: 10, color: T.textPrimary, fontSize: 15, textAlign: "center" },
  name: { color: T.textPrimary, fontSize: 22, fontWeight: "800", marginTop: 14, marginBottom: 4 },
  signOut: { borderWidth: 1, borderColor: T.red + "44", borderRadius: 14, paddingVertical: 13, alignItems: "center", marginTop: 4 },
});
