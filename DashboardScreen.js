// src/screens/lawyer/DashboardScreen.js
import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { T, SPACE } from '../../theme';
import { Card, Avatar, ScoreRing, ScoreBadge, Pill, Label, Screen, PrimaryBtn, FooterDisclaimer } from '../../components/SharedComponents';
import { MOCK_CASES, MOCK_LAWYERS } from '../../data/mockData';

export default function DashboardScreen({ navigation }) {
  const lawyer = MOCK_LAWYERS[0];
  const newCases = MOCK_CASES.filter(c => c.status === 'pending');
  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: SPACE.lg }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACE.lg }}>
            <View>
              <Text style={{ color: T.textSecondary, fontSize: 13 }}>Welcome back</Text>
              <Text style={{ color: T.textPrimary, fontSize: 22, fontWeight: '800', letterSpacing: -0.6 }}>{lawyer.name}</Text>
            </View>
            <Avatar initials={lawyer.avatar} size={44} />
          </View>
          <View style={{ flexDirection: 'row', gap: SPACE.sm, marginBottom: SPACE.lg }}>
            {[['📥', '2', 'New'], ['⏳', '3', 'Reviewing'], ['✅', '9', 'Resolved'], ['💰', '$3.2k', 'Earned']].map(([icon, n, l], i) => (
              <View key={i} style={{ flex: 1, backgroundColor: T.surface, borderColor: T.border, borderWidth: 1, borderRadius: 12, padding: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>{icon}</Text>
                <Text style={{ color: T.gold, fontSize: 15, fontWeight: '900' }}>{n}</Text>
                <Text style={{ color: T.textMuted, fontSize: 10 }}>{l}</Text>
              </View>
            ))}
          </View>
          {newCases.some(c => c.urgency === 'immediate') && (
            <Card accent={T.red} style={{ backgroundColor: T.redDim, marginBottom: SPACE.md }}>
              <Text style={{ color: T.red, fontWeight: '800', fontSize: 14 }}>🚨 {newCases.filter(c => c.urgency === 'immediate').length} urgent case(s) need immediate attention</Text>
            </Card>
          )}
          <Label>New Cases</Label>
          {newCases.map((c, i) => (
            <Card key={i} style={{ marginBottom: SPACE.sm }} onPress={() => navigation.navigate('Cases')}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: T.textPrimary, fontWeight: '700', fontSize: 15 }}>{c.category}</Text>
                  <Text style={{ color: T.textMuted, fontSize: 12, marginTop: 2 }}>{c.country} · {c.date}</Text>
                </View>
                <ScoreBadge score={c.score} />
              </View>
              <Text style={{ color: T.textSecondary, fontSize: 13, lineHeight: 20 }} numberOfLines={2}>{c.story}</Text>
            </Card>
          ))}
          <FooterDisclaimer />
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}
