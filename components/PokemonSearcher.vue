<template>
  <div class="relative">
    <MagnifyingGlassIcon
      class="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
    />
    <input
      v-model="search"
      type="text"
      name="search"
      class="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      placeholder="search"
      @keyup.enter="searchPokemon"
    />
  </div>
</template>
<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { mapPokemonDetails } from "@/utils/pokemonBasics";
import { getPokemon } from "@/services/pokemonServices";
import type { Pokemon } from "@/types/pokemonTypes";

const search = ref("");
const pokemon = ref<Pokemon | null>(null);
const errorMessage = ref(
  "No se pudo encontrar el Pokémon. Intenta con otro nombre."
);

const searchPokemon = async () => {
  if (search.value.trim()) {
    try {
      //    isLoading.value = true;
      const pokemonData = await getPokemon(search.value.toLowerCase().trim());
      pokemon.value = mapPokemonDetails(pokemonData);
      console.log(pokemon.value);
      //   showDialog.value = true;
    } catch (error) {
      console.error("Pokémon no encontrado:", error);
      pokemon.value = null;
      //   showDialog.value = false;
      //   showError.value = true;
    } finally {
      //   isLoading.value = false;
    }
  } else {
    errorMessage.value =
      "Por favor, ingresa el nombre de un Pokémon para buscar.";
    // showError.value = true;
  }
};
</script>
