import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { T, SPACE, RADIUS } from './src/theme';
import { UserNavigator, LawyerNavigator, AdminNavigator } from './src/navigation';

const ROLES = [
  { id: 'user',   label: 'User',   icon: '👤' },
  { id: 'lawyer', label: 'Lawyer', icon: '⚖️' },
  { id: 'admin',  label: 'Admin',  icon: '🛡️' },
];

export default function App() {
  const [role, setRole] = useState('user');

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={T.bg} />
      <NavigationContainer theme={{ colors: { background: T.bg, card: T.surface, text: T.textPrimary, border: T.border, notification: T.gold }, dark: true }}>

        {/* ── Top bar with brand + role switcher ── */}
        <SafeAreaView style={{ backgroundColor: T.bg }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACE.md, paddingVertical: SPACE.sm, borderBottomWidth: 1, borderBottomColor: T.border }}>

            {/* Brand */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={{ fontSize: 15 }}>⚖️</Text>
              <Text style={{ color: T.textPrimary, fontSize: 14, fontWeight: '900', letterSpacing: -0.4 }}>Review My Case</Text>
            </View>

            {/* Role switcher — in production, remove this and drive role from auth */}
            <View style={{ flexDirection: 'row', backgroundColor: T.surface, borderRadius: RADIUS.md, borderWidth: 1, borderColor: T.border, overflow: 'hidden' }}>
              {ROLES.map(r => (
                <TouchableOpacity key={r.id} onPress={() => setRole(r.id)}
                  style={{ paddingHorizontal: 12, paddingVertical: 6, backgroundColor: role === r.id ? T.goldDim : 'transparent' }}>
                  <Text style={{ color: role === r.id ? T.gold : T.textMuted, fontSize: 12, fontWeight: '700' }}>
                    {r.icon} {r.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </SafeAreaView>

        {/* ── Role-based navigator ── */}
        {role === 'user'   && <UserNavigator />}
        {role === 'lawyer' && <LawyerNavigator />}
        {role === 'admin'  && <AdminNavigator />}

      </NavigationContainer>
    </SafeAreaProvider>
  );
}
