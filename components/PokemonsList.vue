<template>
  <div
    class="w-full pl-6 pr-6 sm:pl-12 sm:pr-12 md:pl-20 md:pr-20 lg:pl-80 lg:pr-80 mt-6"
  >
    <div class="flex flex-col gap-4">
      <PokemonSearcher />
      <div
        v-for="pokemon in pokemonsList"
        :key="pokemon.name"
        class="bg-neutral-50 p-3 rounded-md shadow mb-2"
      >
        <div class="flex items-center justify-between w-full">
          <div @click="openModal(pokemon.name)" class="flex-1 cursor-pointer">
            <h3 class="font-bold capitalize">{{ pokemon.name }}</h3>
          </div>
          <div @click.stop>
            <AddRemovePokemonFavorites :pokemon="pokemon" />
          </div>
        </div>
      </div>
      <PokemonCard
        :pokemonName="selectedPokemon"
        v-model:show-dialog="showDialog"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Pokemon } from "@/types/pokemonTypes";
import { getAllPokemons } from "@/services/pokemonServices";
import PokemonSearcher from "./PokemonSearcher.vue";
import PokemonCard from "./PokemonCard.vue";
import AddRemovePokemonFavorites from "./AddRemovePokemonFavorites.vue";

const isLoading = ref(false);
const pokemonsList = ref<Pokemon[]>([]);
const showDialog = ref(false);
const selectedPokemon = ref("");
const openModal = (pokemonName: string) => {
  selectedPokemon.value = pokemonName;
  showDialog.value = true;
};

const getListPokemons = async () => {
  try {
    // const offset = getOffset(pageNum);
    const pokemons = await getAllPokemons();
    pokemonsList.value = pokemons.results.map((pokemon: any) => ({
      name: pokemon.name,
      url: pokemon.url,
    }));
  } catch (error) {
    console.error("Error fetching pokemons:", error);
  } finally {
    isLoading.value = true;
  }
};

onMounted(() => {
  getListPokemons();
});
</script>
