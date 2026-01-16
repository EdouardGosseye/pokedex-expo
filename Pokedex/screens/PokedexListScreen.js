import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { PokemonCard } from "../components/PokemonCard";
import { getIdFromUrl, normalizeText } from "../utils/pokemon";

const LIMIT = 151;

export function PokedexListScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState("ID_ASC");
  const [onlyFirst50, setOnlyFirst50] = useState(false);

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

  const filteredSorted = useMemo(() => {
    const q = normalizeText(query);

    let list = data;

    if (q.length > 0) list = list.filter((p) => normalizeText(p.name).includes(q));
    if (onlyFirst50) list = list.filter((p) => getIdFromUrl(p.url) <= 50);

    const copy = [...list];
    copy.sort((a, b) => {
      const ida = getIdFromUrl(a.url);
      const idb = getIdFromUrl(b.url);

      if (sortMode === "ID_ASC") return ida - idb;
      if (sortMode === "ID_DESC") return idb - ida;
      if (sortMode === "AZ") return a.name.localeCompare(b.name);
      if (sortMode === "ZA") return b.name.localeCompare(a.name);
      return 0;
    });

    return copy;
  }, [data, query, sortMode, onlyFirst50]);

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

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search by name…"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      <View style={styles.row}>
        <Chip label="ID ↑" active={sortMode === "ID_ASC"} onPress={() => setSortMode("ID_ASC")} />
        <Chip label="ID ↓" active={sortMode === "ID_DESC"} onPress={() => setSortMode("ID_DESC")} />
        <Chip label="A→Z" active={sortMode === "AZ"} onPress={() => setSortMode("AZ")} />
        <Chip label="Z→A" active={sortMode === "ZA"} onPress={() => setSortMode("ZA")} />
      </View>

      <View style={styles.row}>
        <Chip label={`Only ID ≤ 50 ${onlyFirst50 ? "✓" : ""}`} active={onlyFirst50} onPress={() => setOnlyFirst50((v) => !v)} />
      </View>

      {filteredSorted.length === 0 ? (
        <View style={styles.centerInScreen}>
          <Text style={styles.emptyTitle}>No results</Text>
          <Text style={styles.muted}>Try another search or disable filters.</Text>
        </View>
      ) : (
        <FlashList
          data={filteredSorted}
          estimatedItemSize={88}
          keyExtractor={(item) => String(getIdFromUrl(item.url))}
          renderItem={({ item }) => (
            <PokemonCard
              name={item.name}
              url={item.url}
              onPress={() => navigation.navigate("PokemonDetail", { name: item.name })}
            />
          )}
        />
      )}
    </View>
  );
}

function Chip({ label, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 12, gap: 10, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "800" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderWidth: 1, borderColor: "#ddd", borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  chipActive: { backgroundColor: "#111", borderColor: "#111" },
  chipText: { fontWeight: "800" },
  chipTextActive: { color: "#fff" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8, padding: 16, backgroundColor: "#fff" },
  centerInScreen: { flex: 1, alignItems: "center", justifyContent: "center", gap: 6, padding: 16 },
  muted: { color: "#666" },
  emptyTitle: { fontSize: 18, fontWeight: "800" },
  errorTitle: { fontSize: 18, fontWeight: "700", color: "#B00020" },
});
