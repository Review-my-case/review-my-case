import { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { T } from "../theme";
import { useAuth } from "../context/AuthContext";
import AuthNavigator from "./AuthNavigator";
import RoleSwitcher from "./RoleSwitcher";
import UserTabs from "./UserTabs";
import LawyerTabs from "./LawyerTabs";
import AdminTabs from "./AdminTabs";

export default function RootNavigator() {
  const { user, role, initializing } = useAuth();
  const [adminPreviewRole, setAdminPreviewRole] = useState("admin");

  if (initializing) {
    return (
      <View style={{ flex: 1, backgroundColor: T.bg, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={T.gold} size="large" />
      </View>
    );
  }

  if (!user) {
    return <AuthNavigator />;
  }

  const effectiveRole = role === "admin" ? adminPreviewRole : role;

  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      {role === "admin" && <RoleSwitcher role={adminPreviewRole} setRole={setAdminPreviewRole} />}
      <View style={{ flex: 1 }}>
        {effectiveRole === "user" && <UserTabs />}
        {effectiveRole === "lawyer" && <LawyerTabs />}
        {effectiveRole === "admin" && <AdminTabs />}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Review My Case is not a law firm and does not provide legal advice. We securely organize your case and
          help connect you with qualified legal professionals who may be able to assist you. All data is kept
          private and encrypted.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: T.bg },
  footerText: { color: T.textMuted, fontSize: 10, lineHeight: 15, textAlign: "center" },
});
