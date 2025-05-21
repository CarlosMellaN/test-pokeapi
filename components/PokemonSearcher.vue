<template>
  <div class="fixed top-5 left-0 right-0 z-30 flex">
    <div class="relative w-full max-w-2xl mx-auto">
      <MagnifyingGlassIcon
        class="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
      />
      <input
        v-model="search"
        type="text"
        name="search"
        class="w-full py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 pl-10"
        placeholder="search"
        @keyup.enter="searchPokemon"
      />
    </div>
  </div>
  <PokemonCard
    :pokemonName="selectedPokemon"
    v-model:show-dialog="showDialog"
  />
</template>
<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { mapPokemonDetails } from "@/utils/pokemonBasics";
import { getPokemon } from "@/services/pokemonServices";
import type { Pokemon } from "@/types/pokemonTypes";
import PokemonCard from "./PokemonCard.vue";

const search = ref("");
const pokemon = ref<Pokemon | null>(null);
const errorMessage = ref(
  "No se pudo encontrar el Pokémon. Intenta con otro nombre."
);
const showDialog = ref(false);
const selectedPokemon = ref("");
const openModal = (pokemonName: string) => {
  selectedPokemon.value = search.value.toLowerCase().trim();
  showDialog.value = true;
};

const searchPokemon = async () => {
  if (search.value.trim()) {
    try {
      //    isLoading.value = true;
      const pokemonData = await getPokemon(search.value.toLowerCase().trim());
      pokemon.value = mapPokemonDetails(pokemonData);
      console.log(pokemon.value);
      openModal(pokemon.value.name);
    } catch (error) {
      console.error("Pokémon no encontrado:", error);
      pokemon.value = null;
      showDialog.value = false;
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
