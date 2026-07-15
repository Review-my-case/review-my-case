import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { T } from "../../theme";
import { PrimaryBtn } from "../../components/Buttons";
import { useAuth } from "../../context/AuthContext";

export default function SignUpScreen({ navigation }) {
  const { signUp, authError, clearError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    clearError();
    setLoading(true);
    try {
      await signUp(name.trim(), email.trim(), password);
    } catch (e) {
      // authError is already set inside signUp
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.badge}>⚖️ REVIEW MY CASE</Text>
      <Text style={styles.h1}>Create your account</Text>
      <Text style={styles.subtitle}>Takes less than a minute. It's free to start.</Text>

      <Text style={styles.label}>Full name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Your name"
        placeholderTextColor={T.textMuted}
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="you@email.com"
        placeholderTextColor={T.textMuted}
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="At least 6 characters"
        placeholderTextColor={T.textMuted}
        style={styles.input}
      />

      {authError && <Text style={styles.error}>{authError}</Text>}

      {loading ? (
        <ActivityIndicator color={T.gold} style={{ marginTop: 16 }} />
      ) : (
        <PrimaryBtn onPress={handleSignUp} disabled={!name || !email || password.length < 6}>
          Create Account
        </PrimaryBtn>
      )}

      <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginTop: 20 }}>
        <Text style={styles.link}>Already have an account? <Text style={{ color: T.gold, fontWeight: "700" }}>Log in</Text></Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingTop: 60, flexGrow: 1, backgroundColor: T.bg },
  badge: { color: T.gold, fontSize: 13, fontWeight: "800", letterSpacing: 1, marginBottom: 20, textAlign: "center" },
  h1: { color: T.textPrimary, fontSize: 28, fontWeight: "900", marginBottom: 8, textAlign: "center" },
  subtitle: { color: T.textSecondary, fontSize: 15, marginBottom: 28, textAlign: "center" },
  label: { color: T.textSecondary, fontSize: 13, fontWeight: "700", marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: T.surfaceHigh,
    borderWidth: 1,
    borderColor: T.border,
    borderRadius: 10,
    padding: 14,
    color: T.textPrimary,
    fontSize: 15,
  },
  error: { color: T.red, fontSize: 13, marginTop: 14, textAlign: "center" },
  link: { color: T.textSecondary, fontSize: 14, textAlign: "center" },
});
