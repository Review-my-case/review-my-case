import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Label from "../../components/Label";
import Pill from "../../components/Pill";
import StatusPill from "../../components/StatusPill";
import ScoreRing from "../../components/ScoreRing";
import { PrimaryBtn } from "../../components/Buttons";
import ChatModal from "../../components/ChatModal";
import { useAuth } from "../../context/AuthContext";
import { subscribeToAllCases, acceptCase, updateCaseStatus } from "../../data/casesService";

const FILTERS = ["all", "pending", "reviewing", "matched", "closed"];

function CaseDetail({ item, onBack, lawyerUid, lawyerName }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleAccept = async () => {
    setBusy(true);
    await acceptCase(item.id, lawyerUid, lawyerName);
    setBusy(false);
    onBack();
  };

  const handleDecline = async () => {
    setBusy(true);
    await updateCaseStatus(item.id, "closed");
    setBusy(false);
    onBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onBack} style={{ marginBottom: 20 }}>
        <Text style={{ color: T.gold, fontSize: 14, fontWeight: "700" }}>← Back to Cases</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={styles.h2}>{item.category || "Case"}</Text>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            <StatusPill status={item.status} />
          </View>
        </View>
        {item.score != null && <ScoreRing score={item.score} size={80} />}
      </View>

      {item.violations?.length > 0 && (
        <Card style={{ marginBottom: 12 }}>
          <Label>Violations Identified</Label>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {item.violations.map((v, i) => (
              <Pill key={i} label={v.type || v} color={T.red} />
            ))}
          </View>
        </Card>
      )}

      <Card style={{ marginBottom: 12 }}>
        <Label>Case Summary</Label>
        <Text style={{ color: T.textPrimary, fontSize: 15, lineHeight: 24 }}>{item.story}</Text>
      </Card>

      {item.status === "pending" && (
        <Card style={{ marginBottom: 16 }}>
          <Label>Your Decision</Label>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            <PrimaryBtn small onPress={handleAccept} disabled={busy}>✓ Accept Case</PrimaryBtn>
            <TouchableOpacity style={styles.redBtn} onPress={handleDecline} disabled={busy}>
              <Text style={{ color: T.red, fontSize: 13, fontWeight: "700" }}>✕ Decline</Text>
            </TouchableOpacity>
          </View>
        </Card>
      )}

      <PrimaryBtn onPress={() => setChatOpen(true)}>💬 Message Client</PrimaryBtn>

      <ChatModal
        visible={chatOpen}
        onClose={() => setChatOpen(false)}
        caseId={item.id}
        caseTitle={item.category || "Case"}
      />
    </ScrollView>
  );
}

export default function LawyerCasesScreen({ route }) {
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAllCases((data) => {
      setCases(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (route?.params?.openCase) {
      setSelected(route.params.openCase);
    }
  }, [route?.params?.openCase]);

  const filtered = filter === "all" ? cases : cases.filter((c) => c.status === filter);

  if (selected) {
    return (
      <CaseDetail
        item={selected}
        onBack={() => setSelected(null)}
        lawyerUid={user.uid}
        lawyerName={user.displayName || user.email}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.h2}>Case Queue</Text>
        <Text style={{ color: T.textSecondary, fontSize: 14 }}>{filtered.length} cases</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              style={[styles.filterChip, { backgroundColor: active ? T.goldDim : "transparent", borderColor: active ? T.gold : T.border }]}
            >
              <Text style={{ color: active ? T.gold : T.textSecondary, fontSize: 12, fontWeight: "700", textTransform: "capitalize" }}>
                {f}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {loading ? (
        <ActivityIndicator color={T.gold} style={{ marginTop: 30 }} />
      ) : filtered.length === 0 ? (
        <Text style={{ color: T.textMuted, textAlign: "center", marginTop: 30 }}>No cases here yet.</Text>
      ) : (
        <View style={{ gap: 10 }}>
          {filtered.map((c) => (
            <Card key={c.id} onPress={() => setSelected(c)}>
              <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
                {c.score != null && <ScoreRing score={c.score} size={56} />}
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 6 }}>
                    <Text style={{ color: T.textPrimary, fontWeight: "700", fontSize: 15 }}>{c.category || "Case"}</Text>
                    <StatusPill status={c.status} />
                  </View>
                  <Text style={{ color: T.textSecondary, fontSize: 13, lineHeight: 18 }}>
                    {(c.story || "").slice(0, 90)}...
                  </Text>
                </View>
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
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  h2: { color: T.textPrimary, fontSize: 22, fontWeight: "800", letterSpacing: -0.5 },
  filterChip: { borderWidth: 1, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12 },
  redBtn: { backgroundColor: T.redDim, borderWidth: 1, borderColor: T.red + "44", borderRadius: 10, paddingVertical: 9, paddingHorizontal: 16 },
});
