// src/screens/lawyer/CasesScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { T, SPACE, RADIUS } from '../../theme';
import { Card, ScoreBadge, Pill, Label, Screen, PrimaryBtn, GhostBtn, FooterDisclaimer } from '../../components/SharedComponents';
import { MOCK_CASES } from '../../data/mockData';

export default function CasesScreen() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const filters = ['all', 'pending', 'reviewing', 'matched', 'closed'];
  const filtered = filter === 'all' ? MOCK_CASES : MOCK_CASES.filter(c => c.status === filter);
  const sevColor = { High: T.red, Medium: T.amber, Low: T.emerald };

  if (selected) return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: SPACE.lg }}>
          <TouchableOpacity onPress={() => setSelected(null)} style={{ marginBottom: SPACE.md }}>
            <Text style={{ color: T.gold, fontWeight: '700', fontSize: 15 }}>← All Cases</Text>
          </TouchableOpacity>
          <Text style={{ color: T.textPrimary, fontSize: 22, fontWeight: '800', marginBottom: 4 }}>{selected.category}</Text>
          <Text style={{ color: T.textMuted, fontSize: 13, marginBottom: SPACE.lg }}>{selected.country} · {selected.date} · Case {selected.id}</Text>
          <Card style={{ marginBottom: SPACE.sm }}>
            <Label>Story</Label>
            <Text style={{ color: T.textPrimary, fontSize: 15, lineHeight: 24 }}>{selected.story}</Text>
          </Card>
          <Label>Violations Found</Label>
          {selected.violations.map((v, i) => (
            <Card key={i} style={{ marginBottom: SPACE.sm }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: T.textPrimary, fontWeight: '700', fontSize: 14, flex: 1 }}>{v.type}</Text>
                <Pill label={v.severity} color={sevColor[v.severity] || T.textMuted} />
              </View>
            </Card>
          ))}
          <View style={{ flexDirection: 'row', gap: SPACE.sm, marginTop: SPACE.md }}>
            <PrimaryBtn onPress={() => setSelected(null)} style={{ flex: 2 }}>✅ Accept Case</PrimaryBtn>
            <GhostBtn onPress={() => setSelected(null)} style={{ flex: 1 }}>Decline</GhostBtn>
          </View>
          <FooterDisclaimer />
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: SPACE.lg }}>
          <Text style={{ color: T.textPrimary, fontSize: 24, fontWeight: '800', letterSpacing: -0.8, marginBottom: SPACE.md }}>Cases</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: SPACE.md }}>
            <View style={{ flexDirection: 'row', gap: SPACE.sm }}>
              {filters.map(f => (
                <TouchableOpacity key={f} onPress={() => setFilter(f)} style={{ backgroundColor: filter === f ? T.goldDim : T.surface, borderColor: filter === f ? T.gold : T.border, borderWidth: 1.5, borderRadius: RADIUS.pill, paddingHorizontal: 14, paddingVertical: 7 }}>
                  <Text style={{ color: filter === f ? T.gold : T.textSecondary, fontSize: 13, fontWeight: '600', textTransform: 'capitalize' }}>{f}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          {filtered.map((c, i) => (
            <Card key={i} style={{ marginBottom: SPACE.sm }} onPress={() => setSelected(c)}>
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
