import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Label from "../../components/Label";
import ScoreBadge from "../../components/ScoreBadge";
import ScoreRing from "../../components/ScoreRing";
import StatusPill from "../../components/StatusPill";
import { PrimaryBtn } from "../../components/Buttons";
import ChatModal from "../../components/ChatModal";
import { useAuth } from "../../context/AuthContext";
import { subscribeToUserCases } from "../../data/casesService";

function CaseDetail({ item, onBack }) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onBack} style={{ marginBottom: 20 }}>
        <Text style={{ color: T.gold, fontSize: 14, fontWeight: "700" }}>← Back to Cases</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={styles.h2}>{item.category || "Your Case"}</Text>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            <StatusPill status={item.status} />
            {item.score != null && <ScoreBadge score={item.score} />}
          </View>
        </View>
        {item.score != null && <ScoreRing score={item.score} size={80} />}
      </View>

      <Card style={{ marginBottom: 12 }}>
        <Label>Assigned Lawyer</Label>
        {item.lawyerName ? (
          <Text style={{ color: T.textPrimary, fontWeight: "700", fontSize: 15 }}>{item.lawyerName}</Text>
        ) : (
          <Text style={{ color: T.textSecondary, fontSize: 14 }}>Awaiting lawyer match...</Text>
        )}
      </Card>

      {item.summary ? (
        <Card style={{ marginBottom: 12 }}>
          <Label>AI Summary</Label>
          <Text style={{ color: T.textPrimary, fontSize: 14, lineHeight: 22 }}>{item.summary}</Text>
        </Card>
      ) : null}

      <PrimaryBtn onPress={() => setChatOpen(true)}>💬 Open Messages</PrimaryBtn>

      <ChatModal
        visible={chatOpen}
        onClose={() => setChatOpen(false)}
        caseId={item.id}
        caseTitle={item.category || "Your Case"}
      />
    </ScrollView>
  );
}

export default function UserMyCasesScreen() {
  const { user } = useAuth();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToUserCases(user.uid, (data) => {
      setCases(data);
      setLoading(false);
    });
    return unsubscribe;
  }, [user]);

  if (selected) return <CaseDetail item={selected} onBack={() => setSelected(null)} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.h2}>My Cases</Text>
      </View>

      {loading ? (
        <ActivityIndicator color={T.gold} style={{ marginTop: 30 }} />
      ) : cases.length === 0 ? (
        <Text style={{ color: T.textMuted, textAlign: "center", marginTop: 30 }}>
          You haven't submitted a case yet. Tap "Review My Case" from Home to get started.
        </Text>
      ) : (
        <View style={{ gap: 10 }}>
          {cases.map((c) => (
            <Card key={c.id} onPress={() => setSelected(c)}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: T.textPrimary, fontWeight: "700", fontSize: 15, marginBottom: 6 }}>
                    {c.category || "Case"}
                  </Text>
                  <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
                    <StatusPill status={c.status} />
                    {c.score != null && <ScoreBadge score={c.score} />}
                  </View>
                  <Text style={{ color: T.textMuted, fontSize: 12 }}>
                    {c.lawyerName ? `Lawyer: ${c.lawyerName}` : "Awaiting lawyer match"}
                  </Text>
                </View>
                <Text style={{ color: T.textMuted, fontSize: 18, marginLeft: 10 }}>›</Text>
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
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  h2: { color: T.textPrimary, fontSize: 22, fontWeight: "800", letterSpacing: -0.5, marginBottom: 4 },
});
