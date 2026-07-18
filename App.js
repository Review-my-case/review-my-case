import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { T } from "./src/theme";
import { AppProvider } from "./src/context/AppContext";
import { AuthProvider } from "./src/context/AuthContext";
import RootNavigator from "./src/navigation/RootNavigator";
import OfflineBanner from "./src/components/OfflineBanner";
import ErrorBoundary from "./src/components/ErrorBoundary";

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: T.bg,
    card: T.bg,
    border: T.border,
    text: T.textPrimary,
    primary: T.gold,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: T.bg }} edges={["top"]}>
        <StatusBar style="light" />
        <ErrorBoundary>
          <AuthProvider>
            <AppProvider>
              <NavigationContainer theme={navTheme}>
                <OfflineBanner />
                <RootNavigator />
              </NavigationContainer>
            </AppProvider>
          </AuthProvider>
        </ErrorBoundary>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
