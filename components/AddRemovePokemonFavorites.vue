<template>
  <StarIcon
    class="h-10 w-10 text-4xl bg-circle"
    :class="`${isFavoritePokemon(pokemon) ? 'yellow-ochre' : 'grayish'}`"
    @click="toggleFavorite(pokemon)"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { StarIcon } from "@heroicons/vue/24/solid";
import type { Pokemon } from "@/types/pokemonTypes";
import { useFavoritePokemonStore } from "@/store/pokemonStore";

const props = defineProps<{ pokemon: Pokemon }>();

const favoritesPokemons = useFavoritePokemonStore();

const isFavoritePokemon = computed(
  () => (pokemon: Pokemon) => favoritesPokemons.isFavoritePokemon(pokemon.name)
);

const toggleFavorite = (pokemon: Pokemon) => {
  if (isFavoritePokemon.value(pokemon)) {
    favoritesPokemons.removeFavoritePokemon(pokemon.name);
  } else {
    favoritesPokemons.addFavoritePokemon(pokemon);
  }
};
</script>
