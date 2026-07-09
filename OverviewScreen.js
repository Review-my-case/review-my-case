// src/screens/admin/OverviewScreen.js
import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { T, SPACE } from '../../theme';
import { Card, Label, Screen, FooterDisclaimer } from '../../components/SharedComponents';
import { MOCK_CASES } from '../../data/mockData';

export default function AdminOverviewScreen() {
  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: SPACE.lg }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACE.sm, marginBottom: SPACE.lg }}>
            <Text style={{ fontSize: 20 }}>🛡️</Text>
            <Text style={{ color: T.textPrimary, fontSize: 22, fontWeight: '800' }}>Admin Overview</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SPACE.sm, marginBottom: SPACE.lg }}>
            {[['📋', '1,240', 'Total Cases'], ['⚖️', '48', 'Active Lawyers'], ['🌍', '18', 'Countries'], ['✅', '892', 'Resolved'], ['⏳', '180', 'Pending'], ['💰', '$28k', 'Revenue']].map(([icon, n, l], i) => (
              <View key={i} style={{ width: '30%', backgroundColor: T.surface, borderColor: T.border, borderWidth: 1, borderRadius: 12, padding: 12, alignItems: 'center', marginBottom: SPACE.sm }}>
                <Text style={{ fontSize: 18, marginBottom: 4 }}>{icon}</Text>
                <Text style={{ color: T.gold, fontSize: 16, fontWeight: '900' }}>{n}</Text>
                <Text style={{ color: T.textMuted, fontSize: 10, textAlign: 'center' }}>{l}</Text>
              </View>
            ))}
          </View>
          <Label>Recent Activity</Label>
          {MOCK_CASES.slice(0, 3).map((c, i) => (
            <Card key={i} style={{ marginBottom: SPACE.sm }}>
              <Text style={{ color: T.textPrimary, fontWeight: '700', fontSize: 14 }}>{c.category} — {c.country}</Text>
              <Text style={{ color: T.textMuted, fontSize: 12, marginTop: 2 }}>Score: {c.score} · Status: {c.status} · {c.date}</Text>
            </Card>
          ))}
          <FooterDisclaimer />
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}
