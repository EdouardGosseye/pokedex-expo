import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export function ProfileScreen() {
  useEffect(() => {
    console.log("[ProfileScreen] mount");
    return () => console.log("[ProfileScreen] unmount (cleanup)");
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Edouard Gosseye</Text>
      <Text style={styles.muted}>Student • Graduaat Programmeren</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Bio</Text>
        <Text style={styles.value}>Pokédex app met FlashList + search/sort/filter.</Text>
        <Text style={styles.label}>Contact</Text>
        <Text style={styles.value}>edouard@gmail.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 12, gap: 12, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "800" },
  muted: { color: "#666" },
  card: { borderWidth: 1, borderColor: "#eee", borderRadius: 16, padding: 12, gap: 8 },
  label: { color: "#666", fontWeight: "700" },
  value: { fontSize: 16, fontWeight: "600" },
});
