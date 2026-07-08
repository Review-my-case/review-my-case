// src/screens/admin/CasesScreen.js
import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { T, SPACE } from '../../theme';
import { Card, ScoreBadge, Screen, FooterDisclaimer } from '../../components/SharedComponents';
import { MOCK_CASES } from '../../data/mockData';
export default function AdminCasesScreen() {
  return (
    <Screen><SafeAreaView style={{ flex:1 }}><ScrollView contentContainerStyle={{ padding:SPACE.lg }}>
      <Text style={{ color:T.textPrimary, fontSize:24, fontWeight:'800', letterSpacing:-0.8, marginBottom:SPACE.lg }}>All Cases</Text>
      {MOCK_CASES.map((c,i) => (
        <Card key={i} style={{ marginBottom:SPACE.sm }}>
          <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:6 }}>
            <Text style={{ color:T.textPrimary, fontWeight:'700', fontSize:15, flex:1 }}>{c.category}</Text>
            <ScoreBadge score={c.score}/>
          </View>
          <Text style={{ color:T.textSecondary, fontSize:13 }}>{c.country} · {c.date} · {c.status}</Text>
          <Text style={{ color:T.textMuted, fontSize:13, marginTop:4 }} numberOfLines={2}>{c.story}</Text>
        </Card>
      ))}
      <FooterDisclaimer/>
    </ScrollView></SafeAreaView></Screen>
  );
}
