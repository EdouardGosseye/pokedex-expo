import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { capitalize, getIdFromUrl, getSpriteUrlById } from "../utils/pokemon";

export function PokemonCard({ name, url, onPress }) {
  const id = getIdFromUrl(url);
  const img = getSpriteUrlById(id);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image source={{ uri: img }} style={styles.img} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{capitalize(name)}</Text>
        <Text style={styles.muted}>#{id}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12, borderWidth: 1, borderColor: "#eee", borderRadius: 16, backgroundColor: "#fff" },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  img: { width: 56, height: 56 },
  name: { fontSize: 16, fontWeight: "800" },
  muted: { color: "#666" },
  arrow: { fontSize: 24, fontWeight: "800", color: "#999" },
});
