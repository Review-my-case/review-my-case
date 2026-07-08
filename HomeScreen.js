import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { T, SPACE, RADIUS } from '../../theme';
import { Card, PrimaryBtn, GhostBtn, ScoreBadge, Label, Screen, FooterDisclaimer } from '../../components/SharedComponents';
import { CATEGORIES, STATUS_OPTIONS } from '../../data/mockData';
import { useAnthropicAPI } from '../../hooks/useAnthropicAPI';
import IntakeModal from './IntakeModal';

export default function HomeScreen({ navigation }) {
  const [intakeOpen, setIntakeOpen] = useState(false);

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* ── Hero ── */}
          <View style={{ padding: SPACE.lg, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: T.goldDim, borderColor: T.gold + '33', borderWidth: 1, borderRadius: RADIUS.pill, paddingHorizontal: 14, paddingVertical: 7, marginBottom: SPACE.lg }}>
              <Text style={{ fontSize: 13 }}>⚖️</Text>
              <Text style={{ color: T.gold, fontSize: 13, fontWeight: '800', letterSpacing: 1 }}>REVIEW MY CASE</Text>
              <Text style={{ color: T.textMuted, fontSize: 13 }}>·</Text>
              <Text style={{ color: T.textSecondary, fontSize: 13 }}>Global Legal Platform</Text>
            </View>

            <Text style={{ fontSize: 38, fontWeight: '900', color: T.textPrimary, letterSpacing: -2, lineHeight: 42, textAlign: 'center', marginBottom: 6 }}>
              Every case deserves
            </Text>
            <Text style={{ fontSize: 38, fontWeight: '900', color: T.gold, letterSpacing: -2, lineHeight: 42, textAlign: 'center', marginBottom: SPACE.lg }}>
              a second look.
            </Text>

            <Text style={{ color: T.textSecondary, fontSize: 16, lineHeight: 26, textAlign: 'center', marginBottom: SPACE.lg }}>
              You don't need to know legal terms. Just tell your story. Our AI organizes your case, identifies potential violations, and connects you with lawyers who can actually help — <Text style={{ color: T.textPrimary, fontWeight: '700' }}>free or no-win-no-fee.</Text>
            </Text>

            <PrimaryBtn onPress={() => setIntakeOpen(true)} style={{ width: '100%' }}>
              Review My Case — It's Free →
            </PrimaryBtn>
          </View>

          {/* ── 4-box feature grid ── */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: SPACE.lg, gap: SPACE.sm, marginBottom: SPACE.lg }}>
            {[
              { icon: '💬', t: 'Tell your story', d: 'in plain language' },
              { icon: '🔍', t: 'AI detects violations', d: '& appeal grounds' },
              { icon: '📊', t: 'Get a Justice Score', d: 'for your case' },
              { icon: '🤝', t: 'Match with', d: 'free or no-fee lawyers' },
            ].map((f, i) => (
              <View key={i} style={{ width: '47.5%', backgroundColor: T.surface, borderColor: T.border, borderWidth: 1, borderRadius: RADIUS.lg, padding: SPACE.md }}>
                <Text style={{ fontSize: 26, marginBottom: 8 }}>{f.icon}</Text>
                <Text style={{ color: T.textSecondary, fontSize: 14, lineHeight: 20 }}>{f.t} {f.d}</Text>
              </View>
            ))}
          </View>

          {/* ── Stats row ── */}
          <View style={{ flexDirection: 'row', paddingHorizontal: SPACE.lg, gap: SPACE.sm, marginBottom: SPACE.lg }}>
            {[['⚖️', '1,240+', 'Cases reviewed'], ['🌍', '18', 'Countries'], ['🤝', 'Free', 'To start'], ['📊', 'AI', 'Powered']].map(([icon, n, l], i) => (
              <View key={i} style={{ flex: 1, backgroundColor: T.surface, borderColor: T.border, borderWidth: 1, borderRadius: RADIUS.md, padding: SPACE.sm, alignItems: 'center' }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>{icon}</Text>
                <Text style={{ color: T.gold, fontSize: 15, fontWeight: '900' }}>{n}</Text>
                <Text style={{ color: T.textMuted, fontSize: 10, marginTop: 2, textAlign: 'center' }}>{l}</Text>
              </View>
            ))}
          </View>

          {/* ── Recent case card ── */}
          <View style={{ paddingHorizontal: SPACE.lg, marginBottom: SPACE.lg }}>
            <Card>
              <Label>Your recent case</Label>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACE.sm }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: T.textPrimary, fontWeight: '700', fontSize: 15, marginBottom: 4 }}>Wrongful Conviction — Asset Theft</Text>
                  <Text style={{ color: T.textSecondary, fontSize: 13 }}>Lawyer matched: Sarah Okonkwo</Text>
                </View>
                <ScoreBadge score={82} />
              </View>
              <View style={{ flexDirection: 'row', gap: SPACE.sm }}>
                <PrimaryBtn small onPress={() => navigation.navigate('My Cases')} style={{ flex: 2 }}>View Case</PrimaryBtn>
                <GhostBtn small onPress={() => navigation.navigate('My Cases')} style={{ flex: 1 }}>All Cases</GhostBtn>
              </View>
            </Card>
          </View>

          <FooterDisclaimer />
        </ScrollView>
      </SafeAreaView>

      <IntakeModal visible={intakeOpen} onClose={() => setIntakeOpen(false)} />
    </Screen>
  );
}
