export function getIdFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
}

export function getSpriteUrlById(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function normalizeText(s) {
  return s.trim().toLowerCase();
}

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
