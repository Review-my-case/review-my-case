// src/screens/user/MyCasesScreen.js
import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { T, SPACE } from '../../theme';
import { Card, ScoreBadge, Label, Screen, Pill, FooterDisclaimer } from '../../components/SharedComponents';
import { MOCK_USER } from '../../data/mockData';

export default function MyCasesScreen() {
  const statusColor = { reviewing: T.amber, pending: T.blue, matched: T.emerald, closed: T.textMuted };
  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: SPACE.lg }}>
          <Text style={{ color: T.textPrimary, fontSize: 24, fontWeight: '800', letterSpacing: -0.8, marginBottom: SPACE.lg }}>My Cases</Text>
          {MOCK_USER.cases.map((c, i) => (
            <Card key={i} style={{ marginBottom: SPACE.sm }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <Text style={{ color: T.textPrimary, fontWeight: '700', fontSize: 15, flex: 1, marginRight: 8 }}>{c.title}</Text>
                <ScoreBadge score={c.score} />
              </View>
              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
                <Pill label={c.status.charAt(0).toUpperCase() + c.status.slice(1)} color={statusColor[c.status] || T.textMuted} />
              </View>
              <Text style={{ color: T.textMuted, fontSize: 12 }}>{c.date}</Text>
              {c.lawyer && <Text style={{ color: T.textSecondary, fontSize: 13, marginTop: 4 }}>👨‍⚖️ {c.lawyer}</Text>}
            </Card>
          ))}
          <FooterDisclaimer />
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}
