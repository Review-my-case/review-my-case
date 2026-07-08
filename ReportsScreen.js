// src/screens/admin/ReportsScreen.js
import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { T, SPACE } from '../../theme';
import { Card, Label, Screen, FooterDisclaimer } from '../../components/SharedComponents';
export default function AdminReportsScreen() {
  const byCountry = [['Nigeria','🇳🇬',34],['United States','🇺🇸',28],['United Kingdom','🇬🇧',19],['Ghana','🇬🇭',11],['Jamaica','🇯🇲',8]];
  const byCategory = [['Wrongful Conviction',31],['Civil Rights',22],['Police Misconduct',18],['Employment',14],['Property Theft',10],['Other',5]];
  return (
    <Screen><SafeAreaView style={{ flex:1 }}><ScrollView contentContainerStyle={{ padding:SPACE.lg }}>
      <Text style={{ color:T.textPrimary, fontSize:24, fontWeight:'800', letterSpacing:-0.8, marginBottom:SPACE.lg }}>Reports</Text>
      <Label>Cases by Country</Label>
      {byCountry.map(([country, flag, pct], i) => (
        <Card key={i} style={{ marginBottom:SPACE.sm }}>
          <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
            <Text style={{ color:T.textPrimary, fontWeight:'600', fontSize:14 }}>{flag} {country}</Text>
            <Text style={{ color:T.gold, fontWeight:'800', fontSize:14 }}>{pct}%</Text>
          </View>
          <View style={{ height:4, backgroundColor:T.border, borderRadius:2 }}>
            <View style={{ height:4, backgroundColor:T.gold, borderRadius:2, width:`${pct}%` }}/>
          </View>
        </Card>
      ))}
      <Label style={{ marginTop:SPACE.md }}>Cases by Category</Label>
      {byCategory.map(([cat, pct], i) => (
        <Card key={i} style={{ marginBottom:SPACE.sm }}>
          <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
            <Text style={{ color:T.textPrimary, fontWeight:'600', fontSize:14 }}>{cat}</Text>
            <Text style={{ color:T.purpleLight, fontWeight:'800', fontSize:14 }}>{pct}%</Text>
          </View>
          <View style={{ height:4, backgroundColor:T.border, borderRadius:2 }}>
            <View style={{ height:4, backgroundColor:T.purpleLight, borderRadius:2, width:`${pct}%` }}/>
          </View>
        </Card>
      ))}
      <FooterDisclaimer/>
    </ScrollView></SafeAreaView></Screen>
  );
}
