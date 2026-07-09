import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { T } from '../theme';

// User screens
import UserHomeScreen from '../screens/user/HomeScreen';
import UserMyCasesScreen from '../screens/user/MyCasesScreen';
import UserProfileScreen from '../screens/user/ProfileScreen';
import UserHelpScreen from '../screens/user/HelpScreen';

// Lawyer screens
import LawyerDashboardScreen from '../screens/lawyer/DashboardScreen';
import LawyerCasesScreen from '../screens/lawyer/CasesScreen';
import LawyerEarningsScreen from '../screens/lawyer/EarningsScreen';
import LawyerProfileScreen from '../screens/lawyer/ProfileScreen';

// Admin screens
import AdminOverviewScreen from '../screens/admin/OverviewScreen';
import AdminCasesScreen from '../screens/admin/CasesScreen';
import AdminLawyersScreen from '../screens/admin/LawyersScreen';
import AdminReportsScreen from '../screens/admin/ReportsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabBarStyle = {
  backgroundColor: '#0d0d1c',
  borderTopColor: '#1a1a35',
  borderTopWidth: 1,
  paddingBottom: 8,
  paddingTop: 8,
  height: 64,
};

function tabIcon(emoji, focused) {
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.45 }}>{emoji}</Text>
  );
}

function tabLabel(label, focused) {
  return (
    <Text style={{ color: focused ? T.gold : T.textMuted, fontSize: 10, fontWeight: focused ? '700' : '400', marginTop: 2 }}>{label}</Text>
  );
}

// ─── USER TABS ───────────────────────────────────────────────────────────────
export function UserNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle }}>
      <Tab.Screen name="Home" component={UserHomeScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon('🏠', focused), tabBarLabel: ({ focused }) => tabLabel('Home', focused) }} />
      <Tab.Screen name="My Cases" component={UserMyCasesScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon('📋', focused), tabBarLabel: ({ focused }) => tabLabel('My Cases', focused) }} />
      <Tab.Screen name="Profile" component={UserProfileScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon('👤', focused), tabBarLabel: ({ focused }) => tabLabel('Profile', focused) }} />
      <Tab.Screen name="Help" component={UserHelpScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon('❓', focused), tabBarLabel: ({ focused }) => tabLabel('Help', focused) }} />
    </Tab.Navigator>
  );
}

// ─── LAWYER TABS ─────────────────────────────────────────────────────────────
export function LawyerNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle }}>
      <Tab.Screen name="Dashboard" component={LawyerDashboardScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon('📊', focused), tabBarLabel: ({ focused }) => tabLabel('Dashboard', focused) }} />
      <Tab.Screen name="Cases" component={LawyerCasesScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon('⚖️', focused), tabBarLabel: ({ focused }) => tabLabel('Cases', focused) }} />
      <Tab.Screen name="Earnings" component={LawyerEarningsScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon('💰', focused), tabBarLabel: ({ focused }) => tabLabel('Earnings', focused) }} />
      <Tab.Screen name="Profile" component={LawyerProfileScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon('👤', focused), tabBarLabel: ({ focused }) => tabLabel('Profile', focused) }} />
    </Tab.Navigator>
  );
}

// ─── ADMIN TABS ──────────────────────────────────────────────────────────────
export function AdminNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle }}>
      <Tab.Screen name="Overview" component={AdminOverviewScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon('🛡️', focused), tabBarLabel: ({ focused }) => tabLabel('Overview', focused) }} />
      <Tab.Screen name="Cases" component={AdminCasesScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon('📁', focused), tabBarLabel: ({ focused }) => tabLabel('Cases', focused) }} />
      <Tab.Screen name="Lawyers" component={AdminLawyersScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon('👨‍⚖️', focused), tabBarLabel: ({ focused }) => tabLabel('Lawyers', focused) }} />
      <Tab.Screen name="Reports" component={AdminReportsScreen}
        options={{ tabBarIcon: ({ focused }) => tabIcon('📈', focused), tabBarLabel: ({ focused }) => tabLabel('Reports', focused) }} />
    </Tab.Navigator>
  );
}
