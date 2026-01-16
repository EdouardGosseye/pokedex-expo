import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export function PokemonDetailScreen() {
  useEffect(() => {
    console.log("[PokemonDetailScreen] mount");
    return () => console.log("[PokemonDetailScreen] unmount (cleanup)");
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Detail</Text>
      <Text>Detail screen placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 12, gap: 8, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "800" },
});
