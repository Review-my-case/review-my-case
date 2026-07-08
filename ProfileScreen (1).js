// src/screens/lawyer/ProfileScreen.js
import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { T, SPACE } from '../../theme';
import { Card, Avatar, Label, Screen, GhostBtn, Pill, FooterDisclaimer } from '../../components/SharedComponents';
import { MOCK_LAWYERS } from '../../data/mockData';

export default function LawyerProfileScreen() {
  const l = MOCK_LAWYERS[0];
  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: SPACE.lg }}>
          <Text style={{ color: T.textPrimary, fontSize: 24, fontWeight: '800', letterSpacing: -0.8, marginBottom: SPACE.lg }}>My Profile</Text>
          <Card style={{ alignItems: 'center', marginBottom: SPACE.md }}>
            <Avatar initials={l.avatar} size={64} />
            <Text style={{ color: T.textPrimary, fontSize: 18, fontWeight: '800', marginTop: SPACE.sm }}>{l.name}</Text>
            <Text style={{ color: T.textSecondary, fontSize: 14, marginTop: 4 }}>{l.spec}</Text>
            <Text style={{ color: T.textMuted, fontSize: 12, marginTop: 4 }}>{l.country} · Joined {l.joined}</Text>
            <View style={{ flexDirection: 'row', gap: SPACE.sm, marginTop: SPACE.sm }}>
              <Pill label={`⭐ ${l.rating}`} color={T.gold} />
              <Pill label={`${l.cases} cases`} color={T.emerald} />
              <Pill label={l.status === 'active' ? '● Active' : '○ Pending'} color={l.status === 'active' ? T.emerald : T.amber} />
            </View>
          </Card>
          <Label>Bar Verification</Label>
          <Card accent={T.emerald} style={{ marginBottom: SPACE.sm }}>
            <Text style={{ color: T.emerald, fontWeight: '800', fontSize: 14 }}>✓ Verified — Nigeria Bar Association</Text>
            <Text style={{ color: T.textSecondary, fontSize: 13, marginTop: 4 }}>License #NBA-2019-04421 · Verified Jan 2024</Text>
          </Card>
          <Label style={{ marginTop: SPACE.md }}>Specializations</Label>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SPACE.sm }}>
            {['Criminal Defense', 'Appeals', 'Wrongful Conviction', 'Civil Rights'].map((s, i) => (
              <Pill key={i} label={s} color={T.purpleLight} />
            ))}
          </View>
          <GhostBtn onPress={() => {}} style={{ marginTop: SPACE.lg }}>Sign Out</GhostBtn>
          <FooterDisclaimer />
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}
