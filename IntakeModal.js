import React, { useState } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { T, SPACE, RADIUS } from '../../theme';
import { PrimaryBtn, GhostBtn, Label, ScoreRing, Spinner } from '../../components/SharedComponents';
import { CATEGORIES, STATUS_OPTIONS } from '../../data/mockData';
import { useAnthropicAPI } from '../../hooks/useAnthropicAPI';

const LOADING_STEPS = [
  'Reading your story carefully...',
  'Identifying legal violations...',
  'Checking constitutional rights...',
  'Analyzing evidence factors...',
  'Calculating Justice Score...',
  'Building case timeline...',
  'Matching legal experts...',
];

export default function IntakeModal({ visible, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ category: '', story: '', custodyStatus: '', country: 'Not specified', hasEvidence: '', duration: '' });
  const [result, setResult] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const { analyzeCase, loading } = useAnthropicAPI();

  const u = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleAnalyze = async () => {
    setStep(4); // analyzing screen
    let i = 0;
    const iv = setInterval(() => { i++; if (i < LOADING_STEPS.length) setLoadingStep(i); else clearInterval(iv); }, 1400);
    const res = await analyzeCase(form);
    clearInterval(iv);
    setResult(res);
    setStep(5); // results screen
  };

  const reset = () => { setStep(1); setForm({ category:'', story:'', custodyStatus:'', country:'Not specified', hasEvidence:'', duration:'' }); setResult(null); setLoadingStep(0); };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: T.bg }}>

        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACE.lg, borderBottomColor: T.border, borderBottomWidth: 1 }}>
          <Text style={{ color: T.textPrimary, fontSize: 17, fontWeight: '800' }}>
            {step <= 3 ? `New Case — Step ${step} of 3` : step === 4 ? 'Reviewing...' : 'Your Case Report'}
          </Text>
          <TouchableOpacity onPress={() => { reset(); onClose(); }}>
            <Text style={{ color: T.textMuted, fontSize: 22 }}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Progress bar — steps 1-3 only */}
        {step <= 3 && (
          <View style={{ flexDirection: 'row', gap: 4, paddingHorizontal: SPACE.lg, paddingTop: SPACE.sm }}>
            {[1, 2, 3].map(i => (
              <View key={i} style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: i <= step ? T.gold : T.border }} />
            ))}
          </View>
        )}

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: SPACE.lg }}>

          {/* ── STEP 1: Category ── */}
          {step === 1 && (
            <View>
              <Text style={{ color: T.textSecondary, fontSize: 14, marginBottom: SPACE.md }}>What type of case is this?</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SPACE.sm, marginBottom: SPACE.lg }}>
                {CATEGORIES.map(c => (
                  <TouchableOpacity key={c.id} onPress={() => u('category', c.label)}
                    style={{ width: '47.5%', backgroundColor: form.category === c.label ? T.goldDim : T.surfaceHigh, borderColor: form.category === c.label ? T.gold : T.border, borderWidth: 1.5, borderRadius: RADIUS.md, padding: 12 }}>
                    <Text style={{ fontSize: 18, marginBottom: 4 }}>{c.icon}</Text>
                    <Text style={{ color: form.category === c.label ? T.gold : T.textSecondary, fontSize: 13, fontWeight: '600' }}>{c.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <PrimaryBtn onPress={() => form.category && setStep(2)} disabled={!form.category}>Next →</PrimaryBtn>
            </View>
          )}

          {/* ── STEP 2: Story ── */}
          {step === 2 && (
            <View>
              <Text style={{ color: T.textSecondary, fontSize: 14, marginBottom: SPACE.md }}>✍️ Tell us what happened, in your own words.</Text>
              <TextInput
                value={form.story}
                onChangeText={v => u('story', v)}
                placeholder="Describe what happened. Don't worry about legal terms..."
                placeholderTextColor={T.textMuted}
                multiline
                numberOfLines={8}
                style={{ backgroundColor: T.surfaceHigh, borderColor: T.border, borderWidth: 1, borderRadius: RADIUS.md, padding: 12, color: T.textPrimary, fontSize: 15, textAlignVertical: 'top', minHeight: 180, lineHeight: 24, marginBottom: SPACE.md }}
              />
              <Text style={{ color: form.story.length >= 20 ? T.emerald : T.textMuted, fontSize: 12, marginBottom: SPACE.md, textAlign: 'right' }}>
                {form.story.length >= 20 ? '✓ Ready' : `${form.story.length}/20 minimum`}
              </Text>
              <View style={{ flexDirection: 'row', gap: SPACE.sm }}>
                <GhostBtn small onPress={() => setStep(1)} style={{ flex: 1 }}>← Back</GhostBtn>
                <PrimaryBtn onPress={() => form.story.length > 20 && setStep(3)} disabled={form.story.length <= 20} style={{ flex: 2 }}>Next →</PrimaryBtn>
              </View>
            </View>
          )}

          {/* ── STEP 3: Status ── */}
          {step === 3 && (
            <View>
              <Text style={{ color: T.textSecondary, fontSize: 14, marginBottom: SPACE.md }}>📍 What's your current status?</Text>
              <View style={{ gap: SPACE.sm, marginBottom: SPACE.lg }}>
                {STATUS_OPTIONS.map(o => (
                  <TouchableOpacity key={o.id} onPress={() => u('custodyStatus', o.id)}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: form.custodyStatus === o.id ? T.goldDim : T.surfaceHigh, borderColor: form.custodyStatus === o.id ? T.gold : T.border, borderWidth: 1.5, borderRadius: RADIUS.md, padding: 14 }}>
                    <Text style={{ fontSize: 18 }}>{o.icon}</Text>
                    <Text style={{ color: form.custodyStatus === o.id ? T.gold : T.textSecondary, fontSize: 14, fontWeight: '600' }}>{o.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{ flexDirection: 'row', gap: SPACE.sm }}>
                <GhostBtn small onPress={() => setStep(2)} style={{ flex: 1 }}>← Back</GhostBtn>
                <PrimaryBtn onPress={() => form.custodyStatus && handleAnalyze()} disabled={!form.custodyStatus} style={{ flex: 2 }}>🔎 Analyze My Case →</PrimaryBtn>
              </View>
            </View>
          )}

          {/* ── STEP 4: Analyzing ── */}
          {step === 4 && (
            <View style={{ alignItems: 'center', paddingTop: SPACE.xl }}>
              <Spinner size="large" />
              <Text style={{ color: T.textPrimary, fontSize: 20, fontWeight: '800', marginTop: SPACE.lg, marginBottom: SPACE.sm }}>Reviewing your case</Text>
              <Text style={{ color: T.textSecondary, fontSize: 14, marginBottom: SPACE.xl }}>Taking about 30 seconds. Being thorough.</Text>
              <View style={{ width: '100%', gap: SPACE.sm }}>
                {LOADING_STEPS.map((s, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: i <= loadingStep ? T.goldDim : T.surface, borderColor: i <= loadingStep ? T.gold + '44' : T.border, borderWidth: 1, borderRadius: RADIUS.md, padding: 10 }}>
                    <Text style={{ fontSize: 12 }}>{i < loadingStep ? '✓' : i === loadingStep ? '◉' : '○'}</Text>
                    <Text style={{ color: i <= loadingStep ? T.gold : T.textMuted, fontSize: 13, fontWeight: i === loadingStep ? '700' : '400' }}>{s}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* ── STEP 5: Results ── */}
          {step === 5 && result && (
            <View>
              {/* Justice Score */}
              <View style={{ backgroundColor: T.surface, borderColor: T.borderHigh, borderWidth: 1, borderRadius: RADIUS.xl, padding: SPACE.lg, marginBottom: SPACE.md, alignItems: 'center' }}>
                <ScoreRing score={result.justiceScore} />
                <Text style={{ color: T.textSecondary, fontSize: 14, marginTop: SPACE.md, textAlign: 'center', lineHeight: 22 }}>{result.scoreRationale}</Text>
              </View>

              {/* Summary */}
              <View style={{ backgroundColor: T.surface, borderColor: T.border, borderWidth: 1, borderRadius: RADIUS.lg, padding: SPACE.md, marginBottom: SPACE.sm }}>
                <Text style={{ color: T.gold, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: SPACE.sm }}>CASE SUMMARY</Text>
                <Text style={{ color: T.textPrimary, fontSize: 15, lineHeight: 24 }}>{result.summary}</Text>
              </View>

              {/* Violations */}
              <Text style={{ color: T.textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: SPACE.sm }}>POTENTIAL LEGAL VIOLATIONS</Text>
              {result.violations.map((v, i) => (
                <View key={i} style={{ backgroundColor: T.surface, borderColor: T.border, borderWidth: 1, borderRadius: RADIUS.lg, padding: SPACE.md, marginBottom: SPACE.sm }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <Text style={{ color: T.textPrimary, fontWeight: '700', fontSize: 14, flex: 1, marginRight: 8 }}>{v.type}</Text>
                    <View style={{ backgroundColor: (v.severity === 'High' ? T.red : v.severity === 'Medium' ? T.amber : T.emerald) + '22', borderRadius: RADIUS.pill, paddingHorizontal: 8, paddingVertical: 2 }}>
                      <Text style={{ color: v.severity === 'High' ? T.red : v.severity === 'Medium' ? T.amber : T.emerald, fontSize: 11, fontWeight: '700' }}>{v.severity}</Text>
                    </View>
                  </View>
                  <Text style={{ color: T.textSecondary, fontSize: 13, lineHeight: 20 }}>{v.detail}</Text>
                </View>
              ))}

              {/* Next Steps */}
              <View style={{ backgroundColor: T.surface, borderColor: T.border, borderWidth: 1, borderRadius: RADIUS.lg, padding: SPACE.md, marginBottom: SPACE.lg }}>
                <Text style={{ color: T.gold, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: SPACE.sm }}>📍 WHAT TO DO RIGHT NOW</Text>
                {result.nextSteps.map((s, i) => (
                  <View key={i} style={{ flexDirection: 'row', gap: 10, marginBottom: 8 }}>
                    <Text style={{ color: T.gold, fontWeight: '800', fontSize: 14 }}>{i + 1}.</Text>
                    <Text style={{ color: T.textSecondary, fontSize: 14, lineHeight: 22, flex: 1 }}>{s}</Text>
                  </View>
                ))}
              </View>

              <PrimaryBtn onPress={() => { reset(); onClose(); }}>Done — View My Cases →</PrimaryBtn>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
