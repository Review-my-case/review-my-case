import { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Label from "../../components/Label";
import Pill from "../../components/Pill";
import { useAuth } from "../../context/AuthContext";
import { subscribeToAllCases } from "../../data/casesService";

export default function LawyerEarningsScreen() {
  const { user } = useAuth();
  const [myCases, setMyCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAllCases((all) => {
      setMyCases(all.filter((c) => c.lawyerId === user?.uid));
      setLoading(false);
    });
    return unsubscribe;
  }, [user]);

  const casesTaken = myCases.length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h2}>Earnings</Text>

      <View style={styles.statsRow}>
        {[["$0", "Total earned"], ["$0", "This month"], [String(casesTaken), "Cases taken"], ["—", "Per case avg"]].map(([n, l], i) => (
          <View key={i} style={styles.statBox}>
            <Text style={styles.statValue} numberOfLines={1} adjustsFontSizeToFit>{n}</Text>
            <Text style={styles.statLabel}>{l}</Text>
          </View>
        ))}
      </View>

      <Card style={{ marginBottom: 16 }}>
        <Label>Recent Payouts</Label>
        {loading ? (
          <ActivityIndicator color={T.gold} style={{ marginTop: 10 }} />
        ) : casesTaken === 0 ? (
          <Text style={{ color: T.textMuted, fontSize: 13, marginTop: 4 }}>
            No payouts yet — this will fill in once real payments are processed and cases are completed.
          </Text>
        ) : (
          <Text style={{ color: T.textMuted, fontSize: 13, marginTop: 4 }}>
            You have {casesTaken} accepted case{casesTaken === 1 ? "" : "s"}. Payment processing isn't wired up yet — amounts will appear here once that's connected.
          </Text>
        )}
      </Card>

      <Card>
        <Label>Subscription Plan</Label>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={{ color: T.textPrimary, fontWeight: "700", fontSize: 15, marginBottom: 4 }}>Free Plan</Text>
            <Text style={{ color: T.textSecondary, fontSize: 13 }}>Paid plans aren't set up yet.</Text>
          </View>
          <Pill label="Active" color={T.emerald} />
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  h2: { color: T.textPrimary, fontSize: 22, fontWeight: "800", letterSpacing: -0.5, marginBottom: 20 },
  statsRow: { flexDirection: "row", gap: 6, marginBottom: 20 },
  statBox: { flex: 1, backgroundColor: T.surface, borderWidth: 1, borderColor: T.border, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 4, alignItems: "center" },
  statValue: { color: T.gold, fontSize: 16, fontWeight: "900" },
  statLabel: { color: T.textMuted, fontSize: 10, marginTop: 4, textAlign: "center" },
});
