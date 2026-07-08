// src/screens/user/ProfileScreen.js
import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { T, SPACE } from '../../theme';
import { Card, Avatar, Label, Screen, GhostBtn, FooterDisclaimer } from '../../components/SharedComponents';
import { MOCK_USER } from '../../data/mockData';

export default function ProfileScreen() {
  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: SPACE.lg }}>
          <Text style={{ color: T.textPrimary, fontSize: 24, fontWeight: '800', letterSpacing: -0.8, marginBottom: SPACE.lg }}>My Profile</Text>
          <Card style={{ alignItems: 'center', marginBottom: SPACE.md }}>
            <Avatar initials={MOCK_USER.initials} size={64} />
            <Text style={{ color: T.textPrimary, fontSize: 18, fontWeight: '800', marginTop: SPACE.sm }}>{MOCK_USER.name}</Text>
            <Text style={{ color: T.textSecondary, fontSize: 14, marginTop: 4 }}>{MOCK_USER.email}</Text>
            <Text style={{ color: T.textMuted, fontSize: 12, marginTop: 4 }}>Member since {MOCK_USER.joined} · {MOCK_USER.country}</Text>
          </Card>
          <Label>Notifications</Label>
          {MOCK_USER.notifications.map((n, i) => (
            <Card key={i} style={{ marginBottom: SPACE.sm, borderColor: n.read ? T.border : T.gold + '44' }}>
              <Text style={{ color: T.textPrimary, fontSize: 14, marginBottom: 4 }}>{n.text}</Text>
              <Text style={{ color: T.textMuted, fontSize: 12 }}>{n.time}</Text>
            </Card>
          ))}
          <Label style={{ marginTop: SPACE.md }}>Documents</Label>
          {MOCK_USER.documents.map((d, i) => (
            <Card key={i} style={{ marginBottom: SPACE.sm, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Text style={{ fontSize: 18 }}>📎</Text>
              <Text style={{ color: T.textSecondary, fontSize: 14 }}>{d}</Text>
            </Card>
          ))}
          <GhostBtn onPress={() => {}} style={{ marginTop: SPACE.md }}>Sign Out</GhostBtn>
          <FooterDisclaimer />
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}
