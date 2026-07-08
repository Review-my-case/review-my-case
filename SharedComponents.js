import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { T, RADIUS, SPACE } from '../theme';

// ─── PILL BADGE ──────────────────────────────────────────────────────────────
export function Pill({ label, color }) {
  return (
    <View style={{ backgroundColor: color + '22', borderColor: color + '44', borderWidth: 1, borderRadius: RADIUS.pill, paddingHorizontal: 10, paddingVertical: 2 }}>
      <Text style={{ color, fontSize: 11, fontWeight: '700' }}>{label}</Text>
    </View>
  );
}

// ─── SCORE BADGE ─────────────────────────────────────────────────────────────
export function ScoreBadge({ score }) {
  const c = score >= 70 ? T.emerald : score >= 45 ? T.amber : T.red;
  return (
    <View style={{ backgroundColor: c + '22', borderColor: c + '44', borderWidth: 1, borderRadius: RADIUS.sm, paddingHorizontal: 8, paddingVertical: 2 }}>
      <Text style={{ color: c, fontSize: 13, fontWeight: '800' }}>{score}</Text>
    </View>
  );
}

// ─── AVATAR ──────────────────────────────────────────────────────────────────
export function Avatar({ initials, size = 36, color = T.gold }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color + '22', borderColor: color + '44', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size * 0.33, fontWeight: '800' }}>{initials}</Text>
    </View>
  );
}

// ─── CARD ────────────────────────────────────────────────────────────────────
export function Card({ children, accent, style = {}, onPress }) {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper onPress={onPress} activeOpacity={0.85} style={[{ backgroundColor: T.surface, borderColor: accent ? accent + '44' : T.border, borderWidth: 1, borderRadius: RADIUS.lg, padding: SPACE.md }, style]}>
      {children}
    </Wrapper>
  );
}

// ─── LABEL ───────────────────────────────────────────────────────────────────
export function Label({ children, style = {} }) {
  return <Text style={[{ color: T.textSecondary, fontSize: 11, fontWeight: '700', letterSpacing: 1.2, marginBottom: SPACE.sm, textTransform: 'uppercase' }, style]}>{children}</Text>;
}

// ─── PRIMARY BUTTON ──────────────────────────────────────────────────────────
export function PrimaryBtn({ children, onPress, disabled, small, style = {} }) {
  return (
    <TouchableOpacity onPress={disabled ? null : onPress} activeOpacity={0.85}
      style={[{ backgroundColor: disabled ? T.surfaceHigh : T.gold, borderRadius: small ? RADIUS.sm : RADIUS.lg, paddingVertical: small ? 9 : 15, paddingHorizontal: small ? 16 : 20, alignItems: 'center', opacity: disabled ? 0.5 : 1 }, style]}>
      <Text style={{ color: disabled ? T.textMuted : '#07070f', fontSize: small ? 13 : 15, fontWeight: '800' }}>{children}</Text>
    </TouchableOpacity>
  );
}

// ─── GHOST BUTTON ────────────────────────────────────────────────────────────
export function GhostBtn({ children, onPress, small, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}
      style={[{ borderColor: T.border, borderWidth: 1, borderRadius: small ? RADIUS.sm : RADIUS.lg, paddingVertical: small ? 8 : 13, paddingHorizontal: small ? 14 : 20, alignItems: 'center' }, style]}>
      <Text style={{ color: T.textSecondary, fontSize: small ? 13 : 15, fontWeight: '600' }}>{children}</Text>
    </TouchableOpacity>
  );
}

// ─── INPUT FIELD ─────────────────────────────────────────────────────────────
export function InputField({ label, value, onChangeText, placeholder, multiline = false, rows = 1 }) {
  return (
    <View style={{ marginBottom: SPACE.md }}>
      {label && <Label>{label}</Label>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={T.textMuted}
        multiline={multiline}
        numberOfLines={rows}
        style={{
          backgroundColor: T.surfaceHigh, borderColor: T.border, borderWidth: 1,
          borderRadius: RADIUS.md, padding: 12, color: T.textPrimary, fontSize: 15,
          textAlignVertical: multiline ? 'top' : 'center',
          minHeight: multiline ? rows * 24 + 24 : undefined,
        }}
      />
    </View>
  );
}

// ─── JUSTICE SCORE RING ──────────────────────────────────────────────────────
// This is the signature visual element — preserve exactly.
export function ScoreRing({ score, size = 140 }) {
  const r = size * 0.38;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 70 ? T.emerald : score >= 45 ? T.amber : T.red;
  const label = score >= 70 ? 'Strong basis' : score >= 45 ? 'Moderate basis' : 'Needs more docs';

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: size, height: size, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
          <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.border} strokeWidth={size * 0.07} />
          <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={size * 0.07}
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
        </Svg>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color, fontSize: 34, fontWeight: '900', lineHeight: 38 }}>{score}</Text>
          <Text style={{ color: T.textMuted, fontSize: 9, fontWeight: '700', letterSpacing: 1 }}>JUSTICE SCORE</Text>
        </View>
      </View>
      <View style={{ backgroundColor: color + '22', borderColor: color + '44', borderWidth: 1, borderRadius: RADIUS.pill, paddingHorizontal: 12, paddingVertical: 4, marginTop: 10 }}>
        <Text style={{ color, fontSize: 12, fontWeight: '700' }}>{label}</Text>
      </View>
    </View>
  );
}

// ─── SECTION DIVIDER ─────────────────────────────────────────────────────────
export function Divider() {
  return <View style={{ height: 1, backgroundColor: T.border, marginVertical: SPACE.md }} />;
}

// ─── LOADING SPINNER ─────────────────────────────────────────────────────────
export function Spinner({ size = 'small' }) {
  return <ActivityIndicator size={size} color={T.gold} />;
}

// ─── SCREEN WRAPPER ──────────────────────────────────────────────────────────
export function Screen({ children, style = {} }) {
  return (
    <View style={[{ flex: 1, backgroundColor: T.bg }, style]}>
      {children}
    </View>
  );
}

// ─── FOOTER DISCLAIMER ───────────────────────────────────────────────────────
export function FooterDisclaimer() {
  return (
    <Text style={{ color: T.textMuted, fontSize: 11, lineHeight: 17, textAlign: 'center', paddingHorizontal: SPACE.lg, paddingVertical: SPACE.lg }}>
      Review My Case is not a law firm and does not provide legal advice. We securely organize your case and help connect you with qualified legal professionals who may be able to assist you. All data is kept private and encrypted.
    </Text>
  );
}
