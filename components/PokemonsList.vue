<template>
  <div
    class="w-full container w-11/12 max-w-2xl mt-6 pl-5 pr-5 md:pl-0 md:pr-0"
  >
    <div class="flex flex-col">
      <PokemonSearcher @error="handleSearchError" />
      <NotFound v-if="hasError" />
      <InfiniteScroll
        v-else
        class="mt-24"
        :loadMore="getListPokemons"
        :hasMore="hasMore"
        :isLoading="isLoading"
      >
        <template #default>
          <div
            v-for="pokemon in visiblePokemons"
            :key="pokemon.name"
            class="bg-white p-3 rounded-md mb-2"
          >
            <div class="flex justify-between w-full">
              <div
                @click="openModal(pokemon.name)"
                class="flex-1 cursor-pointer"
              >
                <h3 class="font-medium text-[22px] capitalize">
                  {{ pokemon.name }}
                </h3>
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
        </template>
      </InfiniteScroll>
    </div>
    <BottomBar @toggleFavorites="setShowFavorites" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { Pokemon } from "@/types/pokemonTypes";
import { getAllPokemons } from "@/services/pokemonServices";
import PokemonSearcher from "./PokemonSearcher.vue";
import PokemonCard from "./PokemonCard.vue";
import AddRemovePokemonFavorites from "./AddRemovePokemonFavorites.vue";
import BottomBar from "./BottomBar.vue";
import InfiniteScroll from "./InfiniteScroll.vue";
import { useFavoritePokemonStore } from "@/store/pokemonStore";

const isLoading = ref(false);
const pokemonsList = ref<Pokemon[]>([]);
const showDialog = ref(false);
const selectedPokemon = ref("");
const showFavorites = ref(false);
const favoriteStore = useFavoritePokemonStore();

const visiblePokemons = computed(() => {
  return showFavorites.value
    ? favoriteStore.favoritesPokemons
    : pokemonsList.value;
});

const hasError = ref(false);
function handleSearchError(val: boolean) {
  hasError.value = val;
}

const setShowFavorites = (val: boolean) => {
  showFavorites.value = val;
};

const limit = 100;
const offset = ref(0);
const hasMore = ref(true);

const openModal = (pokemonName: string) => {
  selectedPokemon.value = pokemonName;
  showDialog.value = true;
};

const getListPokemons = async () => {
  if (isLoading.value || !hasMore.value) return;
  isLoading.value = true;
  try {
    const pokemons = await getAllPokemons(limit, offset.value);
    if (pokemons.results.length < limit) {
      hasMore.value = false;
    }
    pokemonsList.value = pokemonsList.value.concat(
      pokemons.results.map((pokemon: any) => ({
        name: pokemon.name,
        url: pokemon.url,
      }))
    );
    offset.value += limit;
  } catch (error) {
    console.error("Error fetching pokemons:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getListPokemons();
});
</script>
