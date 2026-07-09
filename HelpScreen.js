// src/screens/user/HelpScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { T, SPACE, RADIUS } from '../../theme';
import { Card, Label, Screen, FooterDisclaimer } from '../../components/SharedComponents';
import { SUPPORT_FAQS } from '../../data/mockData';

export default function HelpScreen() {
  const [open, setOpen] = useState(null);
  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: SPACE.lg }}>
          <Text style={{ color: T.textPrimary, fontSize: 24, fontWeight: '800', letterSpacing: -0.8, marginBottom: 4 }}>Help & Support</Text>
          <Text style={{ color: T.textSecondary, fontSize: 15, marginBottom: SPACE.lg }}>Answers to common questions.</Text>
          <Label>Emergency Legal Contacts</Label>
          {[['🇺🇸 US', 'Dial 211 — free legal referral, 24/7'],['🇬🇧 UK', 'Citizens Advice: 0800 144 8848'],['🇳🇬 Nigeria', 'Legal Aid Council: 09-523-2374'],['🌍 Global', 'lawhelp.org / reliefweb.int']].map(([flag, info], i) => (
            <Card key={i} style={{ marginBottom: SPACE.sm, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Text style={{ fontSize: 18 }}>{flag.split(' ')[0]}</Text>
              <View><Text style={{ color: T.gold, fontWeight: '700', fontSize: 13 }}>{flag.split(' ').slice(1).join(' ')}</Text><Text style={{ color: T.textSecondary, fontSize: 13 }}>{info}</Text></View>
            </Card>
          ))}
          <Label style={{ marginTop: SPACE.lg }}>FAQ</Label>
          {SUPPORT_FAQS.map((f, i) => (
            <TouchableOpacity key={i} onPress={() => setOpen(open === i ? null : i)} style={{ backgroundColor: T.surface, borderColor: T.border, borderWidth: 1, borderRadius: RADIUS.lg, padding: SPACE.md, marginBottom: SPACE.sm }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: T.textPrimary, fontWeight: '700', fontSize: 14, flex: 1, marginRight: 8 }}>{f.q}</Text>
                <Text style={{ color: T.gold, fontSize: 16 }}>{open === i ? '−' : '+'}</Text>
              </View>
              {open === i && <Text style={{ color: T.textSecondary, fontSize: 14, lineHeight: 22, marginTop: 10 }}>{f.a}</Text>}
            </TouchableOpacity>
          ))}
          <FooterDisclaimer />
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}
