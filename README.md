# Pokédex (MA1 Examen)

Kleine Expo app die toont dat ik Tabs + Stack begrijp, FlashList gebruik, API-calls doe en live search/sort/filter implementeer.

## Zoeken/sorteren
In de Home-tab kan je live zoeken op Pokémonnaam via de zoekbalk (filter op de opgehaalde lijst).
Daarnaast kan je sorteren op meerdere manieren: ID oplopend/aflopend en alfabetisch A→Z / Z→A.
Als eenvoudige extra filter is er een toggle “Only ID ≤ 50” om de lijst te beperken.
De sorteerwijze is zichtbaar doordat de actieve sort-knop zwart gemarkeerd is.

## API
PokeAPI (gratis, publiek)

- Lijst: `https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`
- Detail: `https://pokeapi.co/api/v2/pokemon/{name}`

## Run
```bash
npm install
npx expo start
