<template>
  <div class="fixed top-10 w-11/12 max-w-2xl">
    <div class="relative">
      <MagnifyingGlassIcon
        class="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
      />
      <input
        v-model="search"
        type="text"
        name="search"
        class="w-full py-2 rounded-md shadow focus:ring focus:ring-blue-300 pl-10"
        placeholder="Search"
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

const emit = defineEmits<{
  (e: "error", value: boolean): void;
}>();

const search = ref("");
const pokemon = ref<Pokemon | null>(null);
const errorMessage = ref(
  "No se pudo encontrar el Pokémon. Intenta con otro nombre."
);
const showDialog = ref(false);
const selectedPokemon = ref("");
const hasError = ref(false);
const openModal = (pokemonName: string) => {
  selectedPokemon.value = search.value.toLowerCase().trim();
  showDialog.value = true;
};

const searchPokemon = async () => {
  if (search.value.trim()) {
    try {
      const pokemonData = await getPokemon(search.value.toLowerCase().trim());
      pokemon.value = mapPokemonDetails(pokemonData);
      openModal(pokemon.value.name);
    } catch (error) {
      console.error("Pokémon no encontrado:", error);
      pokemon.value = null;
      showDialog.value = false;
      hasError.value = true;
      emit("error", true);
    }
  } else {
    errorMessage.value =
      "Por favor, ingresa el nombre de un Pokémon para buscar.";
    hasError.value = true;
    emit("error", true);
  }
};
</script>
