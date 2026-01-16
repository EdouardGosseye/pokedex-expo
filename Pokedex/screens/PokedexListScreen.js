import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export function PokedexListScreen() {
  useEffect(() => {
    console.log("[PokedexListScreen] mount");
    return () => console.log("[PokedexListScreen] unmount (cleanup)");
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pokédex</Text>
      <Text>List screen placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 12, gap: 8, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "800" },
});
