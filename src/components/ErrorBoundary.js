import { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { T } from "../theme";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
  }

  render() {
    if (this.state.error) {
      return (
        <ScrollView style={{ flex: 1, backgroundColor: T.bg }} contentContainerStyle={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.subtitle}>
            The app hit an error and stopped instead of continuing silently. Screenshot everything below and send it
            over so it can be fixed.
          </Text>
          <View style={styles.box}>
            <Text style={styles.errorText}>{String(this.state.error?.message || this.state.error)}</Text>
          </View>
          {this.state.info?.componentStack && (
            <View style={styles.box}>
              <Text style={styles.stackText}>{this.state.info.componentStack}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.retryBtn} onPress={() => this.setState({ error: null, info: null })}>
            <Text style={{ color: "#07070f", fontWeight: "800" }}>Try Again</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, paddingBottom: 60 },
  title: { color: T.red, fontSize: 20, fontWeight: "800", marginBottom: 10 },
  subtitle: { color: T.textSecondary, fontSize: 14, lineHeight: 20, marginBottom: 20 },
  box: { backgroundColor: T.surfaceHigh, borderWidth: 1, borderColor: T.border, borderRadius: 10, padding: 12, marginBottom: 14 },
  errorText: { color: T.textPrimary, fontSize: 13, fontFamily: "monospace" },
  stackText: { color: T.textMuted, fontSize: 11, fontFamily: "monospace" },
  retryBtn: { backgroundColor: T.gold, borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 10 },
});
