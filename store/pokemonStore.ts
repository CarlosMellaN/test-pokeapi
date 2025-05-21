import { defineStore } from "pinia";
import { ref } from "vue";
import type { Pokemon } from "@/types/pokemonTypes";

export const useFavoritePokemonStore = defineStore(
  "favoritesPokemons",
  () => {
    const favoritesPokemons = ref<Pokemon[]>([]);
    function addFavoritePokemon(pokemon: Pokemon) {
      const exists = favoritesPokemons.value.some(
        (p) => p.name.toLowerCase() === pokemon.name.toLowerCase()
      );
      if (!exists) {
        console.log("Adding to favorites:", pokemon);
        favoritesPokemons.value.push(pokemon);
      }
    }
    function removeFavoritePokemon(pokemonName: string) {
      favoritesPokemons.value = favoritesPokemons.value.filter(
        (p) => p.name.toLowerCase() !== pokemonName.toLowerCase()
      );
    }
    function isFavoritePokemon(pokemonName: string): boolean {
      return favoritesPokemons.value.some(
        (p) => p.name.toLowerCase() === pokemonName.toLowerCase()
      );
    }

    return {
      favoritesPokemons,
      addFavoritePokemon,
      removeFavoritePokemon,
      isFavoritePokemon,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
