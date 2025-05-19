import { defineStore } from "pinia";
import persist from "pinia-plugin-persistedstate";

import type { Pokemon } from "@/types/pokemonTypes";

export const useFavoritePokemonStore = defineStore(
  "favoritesPokemons",
  () => {
    // Almacena los Pokémon favoritos
    const favoritesPokemons = ref<Pokemon[]>([]);
    // Acción para agregar un Pokémon a favoritos
    function addFavoritePokemon(pokemon: Pokemon) {
      const exists = favoritesPokemons.value.some(
        (p) => p.name === pokemon.name
      );
      if (!exists) {
        favoritesPokemons.value.push(pokemon);
      }
    }
    // Acción para eliminar un Pokémon de favoritos
    function removeFavoritePokemon(pokemonName: string) {
      favoritesPokemons.value = favoritesPokemons.value.filter(
        (p) => p.name !== pokemonName
      );
    }
    function isFavoritePokemon(pokemonName: string): boolean {
      return favoritesPokemons.value.some((p) => p.name === pokemonName);
    }

    return {
      favoritesPokemons,
      addFavoritePokemon,
      removeFavoritePokemon,
      isFavoritePokemon,
    };
  },
  {
    persist: true,
  }
);
