import type { Pokemon } from "@/types/pokemonTypes";

export function mapPokemonDetails(pokemonData: Pokemon): Pokemon {
  const mappedPokemon = {
    name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
    url: pokemonData.species?.url || "",
    imageFront:
      pokemonData.sprites?.other["official-artwork"]?.front_default || "",
    types: pokemonData.types.map((type: { type: { name: string } }) => ({
      name: type.type.name,
    })),
    height: pokemonData.height,
    weight: pokemonData.weight,
  };
  return mappedPokemon;
}
