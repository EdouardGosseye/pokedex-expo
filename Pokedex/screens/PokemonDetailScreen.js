import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { capitalize } from "../utils/pokemon";

export function PokemonDetailScreen({ route, navigation }) {
  const { name } = route.params;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    console.log("[PokemonDetailScreen] mount", name);
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");
        setPokemon(null);

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error("Failed to fetch pokemon detail");
        const json = await res.json();

        if (!cancelled) setPokemon(json);
      } catch (e) {
        if (!cancelled) setError(e.message || "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      console.log("[PokemonDetailScreen] unmount (cleanup)", name);
      cancelled = true;
    };
  }, [name]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.muted}>Loading detail…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.muted}>{error}</Text>
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Not found.</Text>
      </View>
    );
  }

  const img = pokemon.sprites?.front_default;
  const types = pokemon.types?.map((t) => t.type.name).join(", ") ?? "-";

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{capitalize(pokemon.name)}</Text>

      {img ? <Image source={{ uri: img }} style={styles.hero} /> : null}

      <View style={styles.card}>
        <Text style={styles.label}>Types</Text>
        <Text style={styles.value}>{types}</Text>

        <Text style={styles.label}>Height</Text>
        <Text style={styles.value}>{pokemon.height}</Text>

        <Text style={styles.label}>Weight</Text>
        <Text style={styles.value}>{pokemon.weight}</Text>

        <Text style={styles.label}>Base experience</Text>
        <Text style={styles.value}>{pokemon.base_experience}</Text>
      </View>

      <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}>
        <Text style={styles.btnText}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 12, gap: 12, backgroundColor: "#fff" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "900" },
  hero: { width: 160, height: 160, alignSelf: "center" },
  card: { borderWidth: 1, borderColor: "#eee", borderRadius: 16, padding: 12, gap: 6 },
  label: { color: "#666", fontWeight: "800" },
  value: { fontSize: 16, fontWeight: "700" },
  btn: { paddingVertical: 14, borderRadius: 14, backgroundColor: "#111", alignItems: "center" },
  btnPressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  btnText: { color: "#fff", fontWeight: "900" },
  muted: { color: "#666" },
  errorTitle: { fontSize: 18, fontWeight: "800", color: "#B00020" },
});
