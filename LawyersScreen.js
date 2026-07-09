// src/screens/admin/LawyersScreen.js
import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { T, SPACE } from '../../theme';
import { Card, Avatar, Pill, Screen, FooterDisclaimer } from '../../components/SharedComponents';
import { MOCK_LAWYERS } from '../../data/mockData';
export default function AdminLawyersScreen() {
  return (
    <Screen><SafeAreaView style={{ flex:1 }}><ScrollView contentContainerStyle={{ padding:SPACE.lg }}>
      <Text style={{ color:T.textPrimary, fontSize:24, fontWeight:'800', letterSpacing:-0.8, marginBottom:SPACE.lg }}>Lawyers</Text>
      {MOCK_LAWYERS.map((l,i) => (
        <Card key={i} style={{ marginBottom:SPACE.sm }}>
          <View style={{ flexDirection:'row', alignItems:'center', gap:12, marginBottom:8 }}>
            <Avatar initials={l.avatar} size={40}/>
            <View style={{ flex:1 }}>
              <Text style={{ color:T.textPrimary, fontWeight:'700', fontSize:15 }}>{l.name}</Text>
              <Text style={{ color:T.textSecondary, fontSize:13 }}>{l.spec}</Text>
            </View>
            <Pill label={l.status === 'active' ? '● Active' : '○ Pending'} color={l.status === 'active' ? T.emerald : T.amber}/>
          </View>
          <Text style={{ color:T.textMuted, fontSize:12 }}>{l.country} · {l.cases} cases · ⭐ {l.rating} · Joined {l.joined}</Text>
        </Card>
      ))}
      <FooterDisclaimer/>
    </ScrollView></SafeAreaView></Screen>
  );
}
