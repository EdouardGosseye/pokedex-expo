import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { PokemonCard } from "../components/PokemonCard";

const LIMIT = 151;

export function PokedexListScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("[PokedexListScreen] mount");
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=0`);
        if (!res.ok) throw new Error("Failed to fetch pokemon list");
        const json = await res.json();
        if (!cancelled) setData(json.results ?? []);
      } catch (e) {
        if (!cancelled) setError(e.message || "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      console.log("[PokedexListScreen] unmount (cleanup)");
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.muted}>Loading pokédex…</Text>
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

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pokédex</Text>

      <FlashList
        data={data}
        estimatedItemSize={88}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonCard
            name={item.name}
            url={item.url}
            onPress={() => navigation.navigate("PokemonDetail", { name: item.name })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 12, gap: 10, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "800" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8, padding: 16, backgroundColor: "#fff" },
  muted: { color: "#666" },
  errorTitle: { fontSize: 18, fontWeight: "700", color: "#B00020" },
});
