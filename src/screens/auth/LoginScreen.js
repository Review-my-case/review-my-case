import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { T } from "../../theme";
import { PrimaryBtn } from "../../components/Buttons";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { signIn, authError, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    clearError();
    setLoading(true);
    try {
      await signIn(email.trim(), password);
    } catch (e) {
      // authError is already set inside signIn
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.badge}>⚖️ REVIEW MY CASE</Text>
      <Text style={styles.h1}>Welcome back</Text>
      <Text style={styles.subtitle}>Log in to see your cases and messages.</Text>

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
        placeholder="••••••••"
        placeholderTextColor={T.textMuted}
        style={styles.input}
      />

      {authError && <Text style={styles.error}>{authError}</Text>}

      {loading ? (
        <ActivityIndicator color={T.gold} style={{ marginTop: 16 }} />
      ) : (
        <PrimaryBtn onPress={handleLogin} disabled={!email || !password}>
          Log In
        </PrimaryBtn>
      )}

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={{ marginTop: 20 }}>
        <Text style={styles.link}>Don't have an account? <Text style={{ color: T.gold, fontWeight: "700" }}>Sign up</Text></Text>
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
