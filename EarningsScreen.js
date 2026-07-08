// src/screens/lawyer/EarningsScreen.js
import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { T, SPACE } from '../../theme';
import { Card, Label, Screen, FooterDisclaimer } from '../../components/SharedComponents';

export default function EarningsScreen() {
  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: SPACE.lg }}>
          <Text style={{ color: T.textPrimary, fontSize: 24, fontWeight: '800', letterSpacing: -0.8, marginBottom: SPACE.lg }}>Earnings</Text>
          <View style={{ flexDirection: 'row', gap: SPACE.sm, marginBottom: SPACE.lg }}>
            {[['💰', '$3,200', 'Total earned'], ['📥', '$480', 'This month'], ['⚖️', '14', 'Cases taken']].map(([icon, n, l], i) => (
              <View key={i} style={{ flex: 1, backgroundColor: T.surface, borderColor: T.border, borderWidth: 1, borderRadius: 12, padding: 12, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, marginBottom: 4 }}>{icon}</Text>
                <Text style={{ color: T.gold, fontSize: 16, fontWeight: '900' }}>{n}</Text>
                <Text style={{ color: T.textMuted, fontSize: 11, textAlign: 'center' }}>{l}</Text>
              </View>
            ))}
          </View>
          <Label>Recent Payouts</Label>
          {[['Jan 20, 2026', 'Civil Rights case — Marcus T.', '$320'], ['Jan 14, 2026', 'Wrongful conviction referral', '$160'], ['Jan 8, 2026', 'Employment case — D. Okafor', '$240']].map(([date, desc, amt], i) => (
            <Card key={i} style={{ marginBottom: SPACE.sm, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: T.textPrimary, fontWeight: '600', fontSize: 14 }}>{desc}</Text>
                <Text style={{ color: T.textMuted, fontSize: 12, marginTop: 2 }}>{date}</Text>
              </View>
              <Text style={{ color: T.emerald, fontWeight: '800', fontSize: 15 }}>{amt}</Text>
            </Card>
          ))}
          <Card accent={T.gold} style={{ marginTop: SPACE.md }}>
            <Text style={{ color: T.gold, fontWeight: '800', fontSize: 15, marginBottom: 4 }}>📋 Current Plan</Text>
            <Text style={{ color: T.textSecondary, fontSize: 14 }}>Professional — $49/month · Unlimited case leads · Priority matching</Text>
          </Card>
          <FooterDisclaimer />
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}
